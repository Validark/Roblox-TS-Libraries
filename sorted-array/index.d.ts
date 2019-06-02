declare class SortedArray<T> {
  /**
   * Removes an element from index, returning that element.
   * @param index The index the element is at which should be removed
   */
  public removeIndex(index: number): T;
  public forEach();
  public map();
  public some();
  public every();
  public reduce();
  public reduceRight();
  public filter();
  public slice();

  /**
   * Inserts an element in the proper place which would preserve the array's orderedness. Returns the index the element was inserted.
   * @param element The element to insert
   */
  public insert(element: T): number;

  /**
   * Finds an Element in a SortedArray and returns its position (or nil if non-existant).
   * @param signature The element to match to the values in the SortedArray.
   * @param equalsFunction An optional equality checking function which takes values from the SortedArray as the first parameter and the signature as the second.
   * @param lessThanFunction An optional less-than checking function which takes values from the SortedArray as the first parameter and the signature as the second. Defaults to the comparison which was passed into the constructor.
   * @param U_0 The first possible index the element could occur. Defaults to the first index.
   * @param U_n The last possible index the element could occur. Defaults to the last index.
   */
  public indexOf<R>(
    signature: R,
    equalsFunction?: (a: T, b: R) => boolean,
    lessThanFunction?: (a: T, b: R) => boolean,
    U_0?: number,
    U_n?: number
  );

  /**
   * Returns a raw array with the same values (shallow-copied).
   */
  public copy(): Array<T>;

  /**
   * Returns a clone of the sorted array
   */
  public clone(): SortedArray<T>;

  /**
   * Searches the array via SortedArray:indexOf(Signature, Eq, Lt). If found, it removes the value and returns the value, otherwise returns nil. Only removes a single occurence.
   * @param signature The element to match to the values in the SortedArray.
   * @param equalsFunction An optional equality checking function which takes values from the SortedArray as the first parameter and the signature as the second.
   * @param lessThanFunction An optional less-than checking function which takes values from the SortedArray as the first parameter and the signature as the second. Defaults to the comparison which was passed into the constructor.
   */
  public removeElement<R>(
    signature: R,
    equalsFunction?: (a: T, b: R) => boolean,
    lessThanFunction?: (a: T, b: R) => boolean
  ): T | undefined;

  /**
   * Calls table.sort, if you for some reason instantiated a SortedArray an avoided sorting it
   */
  public sort(): void;

  /**
   * Removes the value at Index and re-inserts it. This is useful for when a value may have updated in a way that could change it's position in a SortedArray. Returns Index.
   * @param index
   */
  public sortIndex(index: number): number;

  /**
   * Calls RemoveElement(Signature, Eq, Lt) and re-inserts the value. This is useful for when a value may have updated in a way that could change it's position in a SortedArray. Returns Index.
   * @param signature The element to match to the values in the SortedArray.
   * @param equalsFunction An optional equality checking function which takes values from the SortedArray as the first parameter and the signature as the second.
   * @param lessThanFunction An optional less-than checking function which takes values from the SortedArray as the first parameter and the signature as the second. Defaults to the comparison which was passed into the constructor.
   */
  public sortElement<R>(
    signature: R,
    equalsFunction?: (a: T, b: R) => boolean,
    lessThanFunction?: (a: T, b: R) => boolean
  ): number;
  /**
   * Returns a SortedArray of Commonalities between self and another SortedArray. If applicable, the returned SortedArray will inherit the Comparison function from self
   */
  public getIntersection(
    SortedArray2: SortedArray<T>,
    equalsFunction?: (a: T, b: T) => boolean,
    lessThanFunction?: (a: T, b: T) => boolean
  ): SortedArray<T>;

  /**
   * Returns the first element of the SortedArray
   */
  public front(): T;

  /**
   * Returns the last element of the SortedArray
   */
  public back(): T;

  /**
   * Returns the middle element, averaging the middle two if applicable
   */
  public median(): T;
  /**
   * Returns the first Quartile element, averaging the two contenders if applicable
   */
  public quartile1(): T;
  /**
   * Returns the first Quartile element, averaging the two contenders if applicable
   */
  public quartile3(): T;
}

export = SortedArray;
