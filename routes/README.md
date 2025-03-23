### Sending Notifications and Monitoring: Email, WhatsApp, SMS, Push, DLQ, and Metrics

## Overview

This guide provides the required JSON body formats for sending custom notifications via Email (SendGrid and Brevo), WhatsApp (Twilio), SMS (Twilio and AWS), and Push (Firebase Cloud Messaging). Follow the specified structures carefully when making requests. To trigger a notification manually—bypassing Dapr, Kafka, or Redis—add "transmission": "urgent" to the JSON body.

---

### Sending Custom Emails with SendGrid

To send a custom email using SendGrid, use the following JSON structure (This will use Dapr to send message to queue):

```json
{
  "type": "email",
  "to": "recipient@try.com",
  "subject": "Your email subject",
  "text": "Your message",
}
```

To manually send an email with SendGrid, add "transmission": "urgent":

```json
{
  "type": "email",
  "to": "recipient@try.com",
  "subject": "Your email subject",
  "text": "Your message",
  "transmission": ["urgent"]
}
```

Note: The "transmission" field must be set to "urgent" to indicate you intend to send the message without relying on Dapr, Kafka, or Redis.

### Parameters
- type: Specifies the message type (should be "email").
- to: Recipient’s email address.
- subject: Subject line of the email.
- text: Plain text content of the email.
- transmission: Setting "urgent" value in this field triggers manual sending of emails.

---

### Sending Emails with Brevo/SendGrid Templates

To send a templated email using Brevo or SendGrid, use the following JSON structure:

```json
{
  "type": "email",
  "to": "user@gmail.com",
  "template": [
    "email-change-otp",
    "pswrest-otp",
    "verify-otp",
    "welcome-email"
  ],
  "params": {
    "username": "John Doe",
    "otp": "34433",
    "expiry_time": "5"
  },
  "transmission": [
    "urgent",
    "normal"
  ]
}
```

To manually send an email with a template using Brevo, add "transmission": "urgent":

```json
{
  "type": "email",
  "to": "user@gmail.com",
  "template": [
    "email-change-otp",
    "pswrest-otp",
    "verify-otp",
    "welcome-email"
  ],
  "params": {
    "username": "John Doe",
    "otp": "34433",
    "expiry_time": "5"
  },
  "transmission": [
    "urgent"
  ]
}
```

### Parameters
- to: Recipient’s email address.
- subject: Subject line of the email.
- params: Object containing dynamic data for personalization (e.g., names, dates, tokens).
- template: Configurable templates in Brevo. Log in to your Brevo account to create templates, then configure them in the app with custom names. Example templates above include "pswreset", "welcome-onboard", and "birthday".
- transmission: Set this to "urgent" to bypass Dapr, Kafka, or Redis and send the message directly.

---

### Sending WhatsApp Messages

To send a WhatsApp message, use the following JSON structure:

```json
{
  "type": "whatsapp",
  "to": "A verified phone number",
  "body": "Hello, How is it going..."
}
```

To manually send a WhatsApp message, add "transmission": "urgent":

```json
{
  "type": "whatsapp",
  "to": "A verified phone number",
  "body": "Hello, How is it going...",
  "transmission": ["urgent"]
}
```

### Parameters
- type: Specifies message type as "whatsapp".
- to: Recipient’s verified phone number (for trial users) or any phone number (for paid users).
- body: Message content.
- transmission: Add "transmission": "urgent" to manually send WhatsApp messages.

---

### Sending SMS Messages

To send an SMS, use the following JSON structure:

```json
{
  "type": "sms",
  "to": "A verified phone number",
  "body": "Your verification code is: 56789"
}
```

To manually send an SMS, add "transmission": "urgent":

```json
{
  "type": "sms",
  "to": "A verified phone number",
  "body": "Your verification code is: 56789",
  "transmission": ["urgent"]
}
```

### Parameters
- type: Specifies message type as "sms".
- to: Recipient’s verified phone number (for trial users) or any phone number (for paid users).
- body: SMS content.
- transmission: Add "transmission": "urgent" to manually send SMS messages.

---

### Note; under /models you can change the service provider for both sms (Twilio/Aws) and whatsApp(Twilio)

---
### Sending Push Notifications

To send a Push notification, use the following JSON structure:

```json
{
  "type": "push",
  "token": "Your target's app token",
  "title": "A push notification",
  "body": "Hello, this is a push notification..."
}
```

To manually send a Push notification, add "transmission": "urgent":

```json
{
  "type": "push",
  "token": "Your target's app token",
  "title": "A push notification",
  "body": "Hello, this is a push notification...",
  "transmission": ["urgent"]
}
```

### Parameters
- type: Specifies message type as "push".
- token: Token from the targeted app.
- title: Title line of the push notification.
- body: Body content of the push notification.
- transmission: Add "transmission": "urgent" to manually send Push notifications.

### Working with Dead Letter Queue (DLQ)

The Dead Letter Queue (DLQ) in this application stores messages that could not be delivered successfully after a specified number of retries. Use the following endpoints to manage DLQ messages.

#### 1. Retrieve Messages from the DLQ

To retrieve messages from the DLQ, use the following endpoint:

**Endpoint:** `GET /dlq/messages`

**Description:** Returns all undelivered messages currently stored in the DLQ. This is useful for reviewing failed messages and identifying any recurring issues.

Upon success, you will receive a response similar to this:

```json 
{
  "messages": [
    {
      "data": {
        "messageId": "f06d421d-4a4c-4de4-bc3f-5365c5ead084",
        "params": {
          "day": "Monday",
          "email": "recipient@example.com",
          "name": "John Doe",
          "token": 234
        },
        "subject": "Welcome!",
        "template": [
          "pswrest"
        ],
        "text": "Your password reset token is:",
        "to": "brandonladen486@gmail.com"
      },
      "datacontenttype": "application/json",
      "id": "adff2dac-3226-45d7-9a21-7339b010b629",
      "pubsubname": "pubsub",
      "source": "notifications",
      "specversion": "1.0",
      "time": "2024-11-08T03:26:06Z",
      "topic": "email-notification",
      "traceid": "00-13ee67fa94303b2171fd3932d65b0ff3-b28a9a6fb25b5339-01",
      "traceparent": "00-13ee67fa94303b2171fd3932d65b0ff3-b28a9a6fb25b5339-01",
      "tracestate": "",
      "type": "com.dapr.event.sent",
      "metrics": {
        "messageId": "f06d421d-4a4c-4de4-bc3f-5365c5ead084",
        "status": "Success",
        "latency": "2361ms",
        "retries": 0,
        "errorDetails": null,
        "offset": "120",
        "partition": 0
      },
      "originalTopic": "email-notification",
      "timestamp": "2024-11-08T03:26:10.361Z"
    }
  ]
}
```

#### 2.  Edit a Message in the DLQ

To edit a specific message from the DLQ, use the following endpoint:

**Endpoint:** `PUT /dlq/messages/:messageId`

**Description:** : Allows you to edit a message in the DLQ by specifying its messageId. This can be helpful if adjustments are needed before reprocessing the message.

Upon success, you will receive the following response:

```json
{
  "message": "DLQ message updated successfully"
}
```


#### 3. Reprocess a Message to Its Original Topic

After reviewing and possibly editing a failed message, you can reprocess it by sending it to its original topic for another delivery attempt.

**Endpoint:** `POST /dlq/messages/:messageId/reprocess`

**Description:** : Sends the specified message back to its original queue or topic to be consumed again.


```json
{
  "message": "Message 326e9c00-e6fd-4e23-b603-97b3be5b1183 reprocessed successfully"
}
```

### Retrieving Prometheus Metrics

Prometheus metrics are exposed through this application to allow monitoring of message processing, delivery performance, and system health. You can use the `metrics` endpoint to retrieve these metrics in a format compatible with Prometheus.

#### Endpoint: `GET /metrics`

**Description:** This endpoint provides detailed metrics for Prometheus, including data on message delivery, retry attempts, latency, error rates, and other performance indicators. These metrics are designed for integration with Prometheus to monitor the notification system in real-time.

**Sample Metrics Output:**

Upon a successful request, the endpoint will return data similar to this, which Prometheus can scrape and use for visualization and alerting:

```text
# HELP notification_delivery_attempts_total Total number of delivery attempts for notifications
notification_delivery_attempts_total{method="email", provider="sendgrid"} 452
notification_delivery_attempts_total{method="sms", provider="twilio"} 120
# HELP notification_delivery_failures_total Total number of failed delivery attempts
notification_delivery_failures_total{method="whatsapp", provider="twilio"} 5
# HELP notification_delivery_latency_seconds Average latency of notification deliveries in seconds
notification_delivery_latency_seconds{method="push"} 0.236
# HELP notification_queue_length Number of messages currently in the queue
notification_queue_length 47
```
