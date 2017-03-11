import { AppsrepositoryPage } from './app.po';

describe('appsrepository App', function() {
  let page: AppsrepositoryPage;

  beforeEach(() => {
    page = new AppsrepositoryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
