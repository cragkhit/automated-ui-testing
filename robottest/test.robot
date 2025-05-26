*** Settings ***
Library    SeleniumLibrary
Suite Teardown    Close Browser

*** Variables ***
${browser}      Chrome
${url_mdn}   https://developer.mozilla.org/en-US/
${text}         xpath=//*[@id="lst-ib"]
${search_button}  css=top-nav-search-input

***Test Cases ***
Test opening MDN using Chrome
    Open Browser    ${url_mdn}    ${browser}

Get the page title and compare
    ${title}=  Get Title
    Should Be Equal As Strings  ${title}  MDN Web Docs

Search using the keyword "WebDriver"
    Input Text      q    WebDriver
    Submit Form
    ${title}=  Get Title
    Should Be Equal As Strings  ${title}  WebDriver | MDN