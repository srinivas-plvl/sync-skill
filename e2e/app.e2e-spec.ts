import { SyncSkillPage } from './app.po';

describe('sync-skill App', () => {
  let page: SyncSkillPage;

  beforeEach(() => {
    page = new SyncSkillPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
