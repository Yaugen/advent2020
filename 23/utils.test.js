const { CircularList } = require("./utils");

describe("23-utils CircularList", () => {
  beforeEach(() => {
    this.list = new CircularList();
  });

  describe("CircularList.append", () => {
    it("should add element to empty list", () => {
      const first = this.list.append(1);
      expect(this.list.length).toEqual(1);
      expect(this.list.head.value).toEqual(1);
      expect(this.list.head.right.value).toEqual(1);
      expect(this.list.head.left.value).toEqual(1);
    });
    it("should add element to list with one element", () => {
      const first = this.list.append(1);
      const second = this.list.append(2);
      console.log(second);
      expect(this.list.length).toEqual(2);
      expect(first.value).toEqual(1);
      expect(first.right.value).toEqual(2);
      expect(first.left.value).toEqual(2);
      expect(second.value).toEqual(2);
      expect(second.right.value).toEqual(1);
      expect(second.left.value).toEqual(1);
    });
    it("should add element to list", () => {
      const first = this.list.append(1);
      const second = this.list.append(2);
      const third = this.list.append(3);

      expect(this.list.length).toEqual(3);
      expect(first.value).toEqual(1);
      expect(first.right.value).toEqual(2);
      expect(first.left.value).toEqual(3);
      expect(second.value).toEqual(2);
      expect(second.right.value).toEqual(3);
      expect(second.left.value).toEqual(1);
      expect(third.value).toEqual(3);
      expect(third.right.value).toEqual(1);
      expect(third.left.value).toEqual(2);
    });
  });

  describe("CircularList.removeRight", () => {
    it("should remove left element", () => {
      const first = this.list.append(1);
      const second = this.list.append(2);
      const third = this.list.append(3);

      const value = this.list.removeRight(second);
      expect(value).toEqual(3);
      expect(this.list.length).toEqual(2);
    });
  });
});
