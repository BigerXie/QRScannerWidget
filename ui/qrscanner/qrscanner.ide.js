/* global TW */
TW.IDE.Widgets.qrscanner = function () {
  this.widgetIconUrl = function () {
    return '../Common/extensions/QRScannerWidget/ui/qrscanner/qrscanner.png';
  };

  this.widgetProperties = function () {
    return {
      'name': 'QRScanner',
      'description': 'Widget to show a QR code scanner',
      'category': ['Common'],
      'iconImage': 'qrscanner.png',
      'supportsAutoResize': true,
      'properties': {
        'Width': {
          'description': 'width',
          'defaultValue': 200
        },
        'Height': {
          'description': 'height',
          'defaultValue': 28
        },
        'debugMode': {
          'isVisible': true,
          'baseType': 'BOOLEAN',
          'isEditable': true,
          'defaultValue': false,
          'description': 'true to activate the debug'
        },
        content: {
          isBindingSource: true,
          isVisible: true,
          'isEditable': false,
          description: "the string representing the content of the scanned QR code",
          defaultValue: '',
          baseType: 'STRING'
        },
        error: {
          isBindingSource: true,
          isVisible: true,
          'isEditable': false,
          description: "the error message if scan fails",
          defaultValue: '',
          baseType: 'STRING'
        },
        'hasCamera': {
          isBindingSource: true,
          'isVisible': true,
          'baseType': 'BOOLEAN',
          'isEditable': false,
          'defaultValue': false,
          'description': 'true if at least one camera is available'
        }
      }
    };
  };

  this.widgetServices = function () {
    return {
      'Scan': {
        'warnIfNotBound': true
      },
      'Cancel': {
        'warnIfNotBound': true
      }
    };
  };

  this.widgetEvents = function () {
    return {
      'Scanned': {},
      'Cancelled': {},
      'Error': {}
    };
  };

  this.renderHtml = function () {
    return '<div class="widget-content widget-qrscanner">' + '<span class="qrscanner-property">QR Scanner</span>' + '</div>';
  };
};