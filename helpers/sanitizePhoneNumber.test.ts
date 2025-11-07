import sanitizePhoneNumber from './sanitizePhoneNumber';

describe('sanitizePhoneNumber', () => {
  it('should add +1 to phone number', () => {
    expect(sanitizePhoneNumber('8001113333')).toBe('8001113333');
  });
  it('should should strip dashes, spaces, etc', () => {
    expect(sanitizePhoneNumber('(800) 111-3333')).toBe('8001113333');
  });
  it('should should strip 1 and re-add it as +1', () => {
    expect(sanitizePhoneNumber('18001113333')).toBe('8001113333');
  });
});
