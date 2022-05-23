import CustomType from "../src/components/customType";


let array1 = [{id:"a", dataType:"int"}]
describe('onChangeDataTypeHandle', () => {
  describe('given data to onChangeDataTypeHandle', () => {
    it('onChangeDataTypeHandle', () => {
      let result = CustomType.onChangeDataTypeHandle(array1);
      let expected = { id: "a" , dataType: "int" }
      expect(result).toEqual(expected)
    });

   
  });
  
  
});


