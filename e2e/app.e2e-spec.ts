import { NG4SpeedReadingFrontendPage } from './app.po';

describe('ng4-speed-reading-frontend App', () => {
  let page: NG4SpeedReadingFrontendPage;

  beforeEach(() => {
    page = new NG4SpeedReadingFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
