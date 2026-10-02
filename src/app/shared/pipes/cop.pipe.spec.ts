import { CopPipe } from './cop.pipe';

describe('CopPipe', () => {
  const pipe = new CopPipe();
  it('usa puntos de miles y la moneda', () => {
    expect(pipe.transform(5_650_000)).toBe('5.650.000 COP');
    expect(pipe.transform(100_000, false)).toBe('100.000');
  });
});
