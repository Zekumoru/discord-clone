import generateTag from '../generateTag';

describe('generateTag', () => {
  it('should generate a random tag within 0000 and 9999', () => {
    const tag = generateTag();

    expect(tag).toMatch(/^\d{4}$/);
  });

  it('should pad zeroes at the start if generated tag is less than 1000', () => {
    vi.spyOn(global.Math, 'random').mockReturnValue(0);
    const tag = generateTag();

    expect(tag).toBe('0000');
  });
});
