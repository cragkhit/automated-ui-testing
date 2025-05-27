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