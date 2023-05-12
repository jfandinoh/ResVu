describe('Test', () => {
    it('true === true', () => {
      expect(true).toBe(true)
    })
  })

  describe('test', () => {
    test('testing', () => {
      const expeted = 'Hi ResVu';
      const result = 'Hi ResVu';
  
      expect(result).toStrictEqual(expeted);
    });
  });