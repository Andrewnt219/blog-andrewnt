describe('has prefers-color-scheme', () => {
  describe('with no local storage theme', () => {
    it('should be dark when preferes-color-scheme: dark', () => {
      expect(false).toBeTruthy();
    });

    it('should be light when prefers-color-scheme: light', () => {
      expect(false).toBeTruthy();
    });
  });

  describe('with local storage theme dark', () => {
    it('should be dark preferes-color-scheme: dark', () => {
      expect(false).toBeTruthy();
    });

    it('should be dark when prefers-color-scheme: light', () => {
      expect(false).toBeTruthy();
    });
  });

  describe('with local storage theme light', () => {
    it('should be dark preferes-color-scheme: dark', () => {
      expect(false).toBeTruthy();
    });

    it('should be dark when prefers-color-scheme: light', () => {
      expect(false).toBeTruthy();
    });
  });
});

describe('has no prefers-color-scheme', () => {
  it('should be light with no local storage theme', () => {
    expect(false).toBeTruthy();
  });

  it('should be dark with local storage theme dark', () => {
    expect(false).toBeTruthy();
  });

  it('should be light with local storage theme white', () => {
    expect(false).toBeTruthy();
  });
});
