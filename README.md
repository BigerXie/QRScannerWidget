# QRScannerWidget
An extension to show a QR code scanner.

## Description
This extension provides a widget to show a QR code scanner.

## Properties
- debugMode - BOOLEAN (default = false): if set to true it sends to the browser's JS console a set of information useful for debugging the widget
- content - STRING (no default value): the string representing the content of the scanned QR code
- error - STRING (no default value): the error message if scan fails
- hasCamera - BOOLEAN (default = false): true if at least one camera is available

## Services
- Scan: service to start a scanning
- Cancel: service to cancel a started scanning

## Events
- Scanned: event to notify the scan has completed
- Cancelled: event to notify the scan has cancelled
- Error: event to notify the scan has failed

## Dependencies
- QR Scanner - [link](https://github.com/nimiq/qr-scanner)

## Donate
If you would like to support the development of this and/or other extensions, consider making a [donation](https://www.paypal.com/donate/?business=HCDX9BAEYDF4C&no_recurring=0&currency_code=EUR).
