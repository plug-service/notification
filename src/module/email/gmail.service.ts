import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { SendEmailDto } from './dto/send-email.dto';
import path from 'path';

// This service can impersonate as any other user in organization (google workspace)
const emailImpersonate = 'support@ads-pro.site';
const keyPath = 'secret/google-service-account-key.json';

const SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.send',
];

@Injectable()
export class GmailService {
  async send(dto: SendEmailDto) {
    const gmail = await this.getAuth();

    const { toName, toEmail, subject, htmlBody, fromEmail, fromName } = dto;

    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString(
      'base64',
    )}?=`;

    const messageParts = [
      `From: ${fromName} <${fromEmail}>`,
      `To: ${toName} <${toEmail}>`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      '',
      htmlBody,
    ];

    const message = messageParts.join('\n');

    // The body needs to be base64url encoded.
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      alt: 'json',
      requestBody: {
        raw: encodedMessage,
      },
    });

    return res.data;
  }

  private async getAuth() {
    // TODO:  check if the key file exists

    const JWT = google.auth.JWT;
    const authClient = new JWT({
      keyFile: path.join(__dirname, keyPath),
      scopes: SCOPES,
      subject: emailImpersonate,
    });

    await authClient.authorize(); // once authorized, can do whatever you want

    const gmail = google.gmail({
      auth: authClient,
      version: 'v1',
    });

    return gmail;
  }
}
