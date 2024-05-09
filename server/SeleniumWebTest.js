const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTest() {
    // Initialize the WebDriver
    const driver = new Builder().forBrowser('chrome').build();

    try {
        // Navigate to your website
        await driver.get('http://localhost:3000');

        // Locate and interact with the "upload" element
        const uploadElement = await driver.findElement(By.id('Upload'));
        // Perform actions on the "upload" element (e.g., click, type, etc.)

        // Locate and interact with the "calendar" element
        const calendarElement = await driver.findElement(By.id('Calendar'));
        // Perform actions on the "calendar" element

        // Locate and interact with the "algorithm" element
        const algorithmElement = await driver.findElement(By.id('Algorithm Results'));
        // Perform actions on the "algorithm" element

        const executor = driver as JavascriptExecutor;
        // Test execution of Navigation Bar
        driver.executeScript('arguments[0].scrollIntoView(true); arguments[0].click();', uploadElement);
        await driver.wait(until.pageSource.includes('Upload a CSV File Below'), 5000);
      
        driver.executeScript('arguments[0].scrollIntoView(true); arguments[0].click();', calendarElement);
        await driver.wait(until.pageSource.includes('Class schedule for the week'), 5000);
      
        driver.executeScript('arguments[0].scrollIntoView(true); arguments[0].click();', algorithmElement);
        await driver.wait(until.pageSource.includes('Algorithm Results'), 5000);

        // Declare success
        console.log('Test completed successfully!');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Clean up and close the browser
        await driver.quit();
    }
}

runTest();
