import { ERRORS } from "./errors.enum";
import { ITEM } from "./items.enum";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    if ((quality === null || quality === undefined) && typeof(quality) !== 'number') throw Error(ERRORS.QUALITY_NOT_SPECIFIED)
    if (quality < 0) throw Error(ERRORS.QUALITY_NEGATIVE_INIT)

    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality > 50 ? 50 : quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const name = this.items[i].name

      switch (name) {
        case ITEM.AGED_BRIE:
          this.items[i].sellIn--

          if (this.items[i].quality < 50) this.items[i].quality++
          if (this.items[i].sellIn < 0 && this.items[i].quality < 50) this.items[i].quality++

          break;
        case ITEM.BACKSTAGE_CONCERT:
          this.items[i].sellIn--

          if (this.items[i].quality < 50) {
            this.items[i].quality++

            if (this.items[i].sellIn < 11 && this.items[i].quality < 50) this.items[i].quality++
            if (this.items[i].sellIn < 6 && this.items[i].quality < 50) this.items[i].quality++
          }

          if (this.items[i].sellIn < 0) this.items[i].quality = 0

          break;
        case ITEM.SULFURAS:
          break;
        default:
          this.items[i].sellIn--
          if (this.items[i].quality > 0) this.items[i].quality--
          if (this.items[i].sellIn < 0 && this.items[i].quality > 0) this.items[i].quality--
          break;
      }
    }

    return this.items;
  }
}
