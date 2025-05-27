# Workshop: Automated Web Testing using Selenium, Robot Framework, and Cypress

Please follow the steps below.

## 1. Selenium WebDriver

Selenium WebDriver is an automated testing framework that can be implemented in many languages. In this exercise, we will use JavaScript to create the test cases. Follow the steps below.

1.  Open VS Code.
2.  Create a new folder called “selenium”.
3.  Open Terminal and go to the selenium folder.
    ```bash
    cd selenium
    ```
4.  Then, install Selenium via npm.
    ```bash
    npm install selenium-webdriver
    ```
5.  Download the Chrome Web Driver from: [https://googlechromelabs.github.io/chrome-for-testing/](https://googlechromelabs.github.io/chrome-for-testing/). You have to choose the version that matches your Chrome version. See the version of your Chrome from Help > About Chrome.
    *(Image showing Chrome version and Cypress 'New spec' button)*
6.  Then, select the same version of ChromeDriver.
    *(Image showing ChromeDriver versions)*
7.  Save and extract the file and add it to the system PATH. Note down its location on the machine.
    ```bash
    export PATH=$PATH:<Location of the web driver>
    ```
9.  In VS Code, create a new JavaScript file called `test.js`.
10. Start creating the test case by adding the following code.
    ```javascript
    const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
    (async function example() {
      let driver = await new Builder().forBrowser(Browser.CHROME).build();
      try {
        await driver.get('https://ndid.co.th/en/home-english/');
        await driver.wait(until.titleIs('NDID'), 2000);
      } finally {
        await driver.quit();
      }
    })();
    ```
    
12. Try executing the code and see what happens.
13. Modify the code further to enter the query string into the search box and perform the search.
    ```javascript
    const assert = require("assert");
    const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

    (async function search() {
      let driver = await new Builder().forBrowser(Browser.CHROME).build();
      try {
        await driver.get('https://developer.mozilla.org/en-US/');
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        // Check page title
        const pageTitle = await driver.getTitle();
        await assert.strictEqual(pageTitle, 'WebDriver | MDN');
      } finally {
        await driver.quit();
      }
    })();
    ```

## 2. Robot Framework

Nowadays, the Robot Framework is a widely used tool to perform automated UI testing on web applications. It is built on several other UI testing tools, including Selenium. In this exercise, we’ll try using the Robot framework to perform the same tests as the previous one.

1.  Open Terminal or Command Prompt and create a new folder to store the project’s script.
2.  Then, change the directory to that folder.
    ```bash
    mkdir robottest
    cd robottest
    ```
3.  The Robot framework is built on Python. So, first, make sure that you have Python installed on your machine. Try opening the command line and execute the command below.
    ```bash
    python3 --version
    ```
    You should get a result similar to what is shown below.
    ```bash
    python3 --version
    Python 3.13.0
    ```
    If you can’t see the Python version as shown above, install Python.
4.  Make sure you can use pip to install the Python libraries, run the command below.
    ```bash
    pip3 --version
    ```
    You should see the following result.
    ```bash
    pip3 --version
    pip 24.2 from /opt/homebrew/lib/python3.13/site-packages/pip (python 3.13)
    ```
5.  We will create a virtual environment for this Robot test.
    ```bash
    python3 -m venv env
    ```
6.  Then, activate the virtual environment.
    ```bash
    # macOS
    source env/bin/activate
    # Windows
    env\Scripts\activate
    ```
7.  Next, we are going to install the Robot Framework library by using the following command.
    ```bash
    pip3 install robotframework
    ```
    *(Output showing successful installation of robotframework)*
8.  Try running the `robot` command. If it does not work, you may need to add the robot command to the PATH environment.
    ```bash
    robot
    ```
    *(Output showing robot command error)*
    If you do not see the message like above, try adding the robot executable to the PATH.
    * **macOS**
        ```bash
        export PATH=$PATH:/Users/<Your User Name>/Library/Python/<Version>/bin
        ```
        **Example:**
        ```bash
        export PATH=$PATH:/Users/chaiyong/Library/Python/3.9/bin
        ```
    * **Windows:** Follow the instructions here: [https://www.computerhope.com/issues/ch000549.htm](https://www.computerhope.com/issues/ch000549.htm).
9.  Next, we need to install the SeleniumLibrary so that the Robot Framework can use Selenium WebDriver to run the tests.
    ```bash
    pip3 install robotframework-seleniumlibrary
    ```
10. Next, install the Chrome Driver binary (similar to the one used in the Selenium exercise). We can reuse the previous Chrome Driver that we have already downloaded. Copy the `chromedriver` or `chromedriver.exe` into the project folder. Then, add it to the OS’s PATH environment variable.
    * **macOS**
        ```bash
        export PATH=$PATH:<Full path to the project folder>/RobotTest
        ```
        **Example:**
        ```bash
        export PATH=$PATH:/Users/chaiyong/Desktop/RobotTest
        ```
    * **Windows:** Follow the instructions here: [https://www.computerhope.com/issues/ch000549.htm](https://www.computerhope.com/issues/ch000549.htm).

Now we are ready to write a Robot Framework script.

1.  Open any editor that you prefer (e.g., VS Code). In this exercise sheet, we’ll use Microsoft Visual Studio Code.
2.  You can install an extension to help write Robot Framework scripts more easily in VS Code by installing RobotCode.
    *(Image showing RobotCode VS Code extension)*
3.  In your `robottest` folder, create a file called `test.robot`.
    *(Image showing `test.robot` file creation in VS Code)*
4.  Add this simple script to the file.
    ```robotframework
    *** Settings ***
    Library    SeleniumLibrary

    ***Test Cases ***
    Test opening MDN using Chrome
        Open Browser    https://developer.mozilla.org/en-US/    chrome
    ```
5.  Try running the script by opening the Terminal in VS Code and run the following command.
    ```bash
    robot test.robot
    ```
    You should see that the new Chrome window opens with google.com. The Terminal shows that the test case passes.
    *(Output showing robot test pass)*
6.  Next, add more test cases as shown below.
    ```robotframework
    *** Settings ***
    Library    SeleniumLibrary
    Suite Teardown    Close Browser

    *** Variables ***
    ${browser}      Chrome
    ${url_mdn}   https://developer.mozilla.org/en-US/
    ${text}     xpath=//*[@id="lst-ib"]
    ${header}   xpath=//*[@id="content"]/article/header/h1
    ${search_button}  css=top-nav-search-input

    ***Test Cases ***
    Test opening MDN using Chrome
        Open Browser    ${url_mdn}    ${browser}

    Get the page title and compare
        ${title}=  Get Title
        Should Be Equal As Strings  ${title}  MDN Web Docs

    Search using the keyword "banana"
        Input Text      q    banana
        Submit Form
        ${title}=  Get Title
        Log    Page title after search is: ${title} # Logs the title to the console
        Should Be Equal As Strings  ${title}  Search: "banana"
    ```
7.  Execute the `robot test.robot` command again, and the search is performed with the keyword “banana” and finally the title of the result page is compared.
    *(Output showing multiple robot tests pass)*
8.  The Robot framework also creates a test report for you. Try opening the file `report.html` and you should see the result like below.
    *(Image showing Robot Framework Test Report summary)*
9.  You can click on the “All Tests” link to see the result of each test in the test suite.
    *(Image showing Robot Framework Test Details)*

## 3. Cypress

Cypress is another widely used frontend testing tool for web applications. So, it is also useful for you to learn how to use it as well. Please compare the similarities and differences between Cypress and Robot Framework.

1.  Cypress needs Node.js, so first you must install Node.js: [https://nodejs.org/en/download](https://nodejs.org/en/download)
2.  Then, install Cypress via npm
    ```bash
    cd /your/project/path
    npm install cypress --save-dev
    ```
3.  Start Cypress using this command
    ```bash
    npx cypress open
    ```
    You will see this Cypress window opens.
    *(Image showing Cypress 'What's New' window)*
4.  Select E2E (end-to-end) testing
    *(Image showing Cypress E2E Testing selection)*
5.  Click continue and Cypress will create all the files you have to use.
    *(Image showing Cypress Configuration files created)*
6.  Select Chrome and press “Start E2E Testing in Chrome.”
    *(Image showing Cypress 'What's New' window - duplicate)*
7.  Then, you can start testing in Chrome. Click “Create new spec”.
    *(Image showing Cypress browser selection and 'Create new spec')*
8.  With the predefined spec file choose “Create spec” and “Okay, run the spec.” Cypress will create an example E2E spec file.
    *(Image showing Cypress example spec run)*
9.  Study the generated spec file and try to understand what it does.

Next, we will create our own spec file.

1.  Go to Specs > + New Spec
    *(Image showing Cypress 'New spec' button)*
2.  Select “Create new spec.”
3.  Name your new spec file “test.cy.js.”
4.  In the path of your Cypress installation, open the `e2e` folder and you will see the new e2e test spec file.
5.  Open it with your favorite IDE (note: notice that you can also create the `test.cy.js` directly using your IDE as well).
6.  Replace the content with the code below.
    ```javascript
    Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test based on any exception
      return false
    })

    describe('Test opening MDN using Chrome', () => {
      it('Search "WebDriver"', () => {
        cy.visit('https://developer.mozilla.org/en-US/') //go to MDN
        cy.title().should('eq', 'MDN Web Docs') // title should equal MDN Web Docs
        // type banana in search box and enter
        cy.get('#hp-search-input').type("banana").type('{enter}')
        cy.title().should('eq', 'Search: "banana"') // Check the title
      })
    })
    ```
7.  Save the changes and go back to Cypress.
8.  Click on the `test.cy.js` file and you will see the test case running.
    *(Image showing Cypress test runner)*
9.  Wait until it finishes and see the result. Try to understand the result.
10. Modify the test case to put “banana” as a search keyword and press Enter.
11. Then, check that the result page contains the title text “Search: “banana”.”
