class InvalidRoutesPatternError extends Error {
  public constructor(message: string) {
    super(message);

    this.name = 'InvalidRouteFormatError';
  }
}

export { InvalidRoutesPatternError };
