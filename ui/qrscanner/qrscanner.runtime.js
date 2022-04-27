/* global TW, QrScanner */
$("body").append('<script type="text/javascript" src="../Common/extensions/QRScannerWidget/ui/qrscanner/jslibrary/qr-scanner.umd.min.js"></script>');

TW.Runtime.Widgets.qrscanner = function () {
  var qrScanner;
  var thisWidget = this;
  var uid = new Date().getTime() + "_" + Math.floor(1000 * Math.random());

  this.runtimeProperties = function () {
    return {
      'needsDataLoadingAndError': false,
      'supportsAutoResize': true
    };
  };

  this.renderHtml = function () {
    var html = '';
    html =
            '<div class="widget-content widget-qrscanner widget-qrscanner-' + uid + '">' +
            '<video id ="widget-qrscanner-video-' + uid + '" style="width:100%;height:100%"></video>' +
            '</div>';
    return html;
  };

  this.afterRender = function () {
    var debugMode = thisWidget.getProperty('debugMode');

    QrScanner._disableBarcodeDetector = true;
    QrScanner.hasCamera().then(result => {
      if (debugMode) {
        console.log("QR Scanner -> hasCamera = " + result);
      }

      thisWidget.setProperty("hasCamera", result);
    });
  };

  this.serviceInvoked = function (serviceName) {
    QrScanner._disableBarcodeDetector = true;

    if (serviceName === 'Scan') {
      var debugMode = thisWidget.getProperty('debugMode');

      if (!qrScanner) {
        qrScanner = new QrScanner(document.getElementById('widget-qrscanner-video-' + uid), result => {
          qrScanner.stop();

          if (debugMode) {
            console.log("QR Scanner -> result = " + result);
          }
          thisWidget.setProperty("content", result.data);
          thisWidget.jqElement.triggerHandler('Scanned');
        }, {
          onDecodeError: error => {
            if (error !== QrScanner.NO_QR_CODE_FOUND) {
              if (debugMode) {
                console.log("QR Scanner -> error = " + error);
              }
              thisWidget.setProperty("error", error);
              thisWidget.jqElement.triggerHandler('Error');
            }
          },
          highlightScanRegion: true,
          highlightCodeOutline: true
        });
      }

      qrScanner.setInversionMode("both");
      qrScanner.start().then(() => {
      }, (error) => {
        if (debugMode) {
          console.log("QR Scanner -> error = " + error);
        }
        thisWidget.setProperty("error", error);
        thisWidget.jqElement.triggerHandler('Error');
      });
    } else if (serviceName === 'Cancel') {
      if (qrScanner) {
        qrScanner.stop();
      }
      thisWidget.jqElement.triggerHandler('Cancelled');
    }
  };

  this.updateProperty = function (updatePropertyInfo) {
    if (updatePropertyInfo.TargetProperty === 'debugMode') {
      this.setProperty(updatePropertyInfo.TargetProperty, updatePropertyInfo.RawSinglePropertyValue);
    }
  };

  this.beforeDestroy = function () {
    try {
      console.log("QR Scanner -> destroy qrScanner");
      TW.log.info("QR Scanner -> destroy qrScanner");
      if (qrScanner) {
        qrScanner.destroy();
        qrScanner = null;
      }
    } catch (err) {
      TW.log.error('QR Scanner Before Destroy Error', err);
    }
  };
};