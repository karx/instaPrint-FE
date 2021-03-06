function printPdf() {
    printJS('/test/manual/test.pdf')
  }

  function printPdfWithModal() {
    printJS({
      printable: '/test/manual/test.pdf',
      type: 'pdf',
      showModal: true
    })
  }
  
  function printPdfWithModalAndCloseCallback() {
    printJS({
      printable: '/test/manual/test.pdf',
      type: 'pdf',
      showModal: true,
      onPrintDialogClose: () => console.log('The print dialog was closed'),
      onPdfOpen: () => console.log('Pdf was opened in a new tab due to an incompatible browser')
    })
  }

  function printPdfCompatibleBrowser() {
    printJS({
      printable: '/test/manual/test.pdf',
      type: 'pdf',
      onBrowserIncompatible: () => {
        alert('Browser incompatible')
        return false
      }
    })
  }

  function printPdfBase64() {
    fetch('/test/manual/base64.txt').then(function(response) {
      response.text().then(function(base64) {
        printJS({
          printable: base64,
          type: 'pdf',
          base64: true
        })
      })
    })
  }

  function printHtml() {
    printJS({
      printable: 'test',
      type: 'html'
    })
  }

  function printRawHtml() {
    printJS({
      printable: `<h1>Print.js Raw HTML Print Test</h1>
      <p class="blueText">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
      type: 'raw-html',
      style: '.blueText {color:blue;}'
    })
  }

  function printHtmlCustomStyle() {
    const style = '@page { margin-top: 400px } @media print { h1 { color: blue } }'

    printJS({
      printable: 'test',
      type: 'html',
      style: style,
      scanStyles: false
    })
  }

  function printHtmlCss() {
    printJS({
      printable: 'test',
      type: 'html',
      css: 'test.css',
      scanStyles: false
    })
  }

  function printJson() {
    let data = []
    for (let i=0; i <= 1000; i++) {
      data.push({
        test1: createRandomString(),
        test2: createRandomString()
      })
    }

    printJS({
      printable: data,
      properties: [
        {
          field: 'test1',
          displayName: 'test 1',
          columnSize: 1
        },
        {
          field: 'test2',
          displayName: 'test 2',
          columnSize: 4
        }
      ],
      type: 'json',
      header: 'JSON Print Test'
    })
  }

  function printStyledJson() {
    let data = [
      {
        test1: 'Test1 string',
        test2: 'Test2 string'
      },
      {
        test1: 'more Test1 string',
        test2: 'more Test2 string'
      }
    ]

    printJS({
      printable: data,
      properties: ['test1', 'test2'],
      type: 'json',
      gridStyle: 'border: 2px solid #3971A5;',
      gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;'
    })
  }

  function printNestedJson() {
    let data = []
    for (let i=0; i <= 100; i++) {
      data.push({
        test1: createRandomString(),
        test2: {
          a: createRandomString()
        }
      })
    }

    printJS({
      printable: data,
      properties: [
        {
          field: 'test1',
          displayName: 'test 1',
          columnSize: 1
        },
        {
          field: 'test2.a',
          displayName: 'test 2 - a',
          columnSize: 4
        }
      ],
      type: 'json'
    })
  }

  function createRandomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  function printImage() {
    printJS('test-01.jpg', 'image')
  }

  function printImages() {
    printJS({
      printable: [
        'test-01.jpg',
        'test-02.jpg'
      ],
      type: 'image'
    })
  }

  function printStyledImages() {
    printJS({
      printable: [
        'test-01.jpg',
        'test-02.jpg'
      ],
      type: 'image',
      style: 'img { max-width: 400px; margin: 30px; }'
    })
  }

  function printStyledImagesWithStyleSheet() {
    printJS({
      printable: [
        'test-01.jpg',
        'test-02.jpg'
      ],
      type: 'image',
      css: 'test.css',
    })
  }

  

  function printExternalImages() {
    printJS({
      printable: [
        'https://printjs.crabbly.com/images/print-01-highres.jpg',
        'https://printjs.crabbly.com/images/print-02-highres.jpg',
        'https://printjs.crabbly.com/images/print-03-highres.jpg'
      ],
      type: 'image',
      showModal: true,
      modalMessage: 'Printing...'
    })
  }

  async function printTweet(tweetId) {
    if (!!tweetId) {
        let val = await printJS({
            printable: [
              tweetId
            ],
            type: 'html',
            // showModal: true,
            modalMessage: 'Printing...',
            onPrintDialogClose: updateUIGreen(tweetId, 'blue'),
            onError: (e) => updateUIGreen(tweetId, 'red')
          });
          console.log('val: ',val);
    } else {
        console.log('Empty Tweet link');
    }
  }

  function updateUIGreen(tweetId, color = 'blue') {
    console.log(color);
    document.getElementById(tweetId).style.borderColor = color;
  }

  //TODO: 
  // print.js does not seem to have callback functions onSuccess or on the error.
  // the thing is not handling multiple request at all. let alone gracefully
  // * Need to fix the callback and then update to firebase after handling
  // * Incoming Request Cooldown before prining. Like a 10 sec countdown when it shows up, then prints.
  // * Add User Input options to fasttrack/cancel Incoming request
  