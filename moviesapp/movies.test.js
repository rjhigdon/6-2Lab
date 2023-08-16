const {Builder, Browser, By, until} = require('selenium-webdriver')

let driver; 

beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
});
afterEach(async () => {
        await driver.quit();
});
describe('test the Movies App', ()=> {
    test("can add a movie", async ()=> {
        await driver.get ('http://localhost:3001/')
        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Despicable Me')
        await driver.findElement(By.css('button[type="submit"]')).click()
        const addedMovie = await driver.wait(until.elementLocated(By.css('#movies-list li label')), 1000)
        expect(await addedMovie.getText()).toBe('Despicable Me')
    });
    
    test("can mark movie as watched", async () =>{
        //Gets the web destination for the test
        await driver.get ('http://localhost:3001/')
        //types out the movie into the input field
        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Despicable Me')
        //Sub,its the movie
        await driver.findElement(By.css('button[type="submit"]')).click() //Also can use key.RETURN
        //Finds the checkbox and clicks it
        await driver.findElement(By.css('input[type="checkbox"]')).click()
        //assigns variable to checkbox
        const checkBox = await driver.wait(until.elementLocated(By.css('input[type="checkbox"]')), 1000)
        //assigns a variable for the state of the checkBox being enabled
        const isEnabled = checkBox.isEnabled();
        //checks if the checkbox is checked
        expect(isEnabled).toBeTruthy()
    });

    test("can delete movies from the list", async () => {
        //Gets the web destination for the test
        await driver.get ('http://localhost:3001/')
        //types out the movie into the input field
        await driver.findElement(By.css('input[name="movieTitle"]')).sendKeys('Despicable Me')
        //Submits the movie
        await driver.findElement(By.css('button[type="submit"]')).click() //Also can use key.RETURN
        //Finds the delete Buttton and clicks it
        await driver.findElement(By.css('button[class="delete-btn"]')).click()
        //assigns variable to the delete message
        await driver.sleep(2000)

    })
});