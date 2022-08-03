export class RedirectDto {
  public id: string;
  public url: string;
  public useCount: number;

  constructor(id: string, url: string, useCount: number) {
    this.id = id;
    this.url = url;
    this.useCount = useCount;
  }
}
