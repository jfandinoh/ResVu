describe('Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    })
  })

  describe('prueba', () => {
    test('Probando el mentodo', () => {
      const expeted = 'Hi ResVu';
      const result = 'Hi ResVu';
  
      expect(result).toStrictEqual(expeted);
    });
  });