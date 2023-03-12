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
          if (this.items[i].quality < 50) {
            this.items[i].quality++
          }

          if (this.items[i].sellIn < 0) {
            // @TODOFO: REFACT-5
            if (this.items[i].quality < 50) this.items[i].quality++
          }

          break;
        case ITEM.BACKSTAGE_CONCERT:
          this.items[i].sellIn--

          // Cas pas AGED_BRIE && est BACKSTAGE_CONCERT && Sell-in negatif
          // @TODOFO: REFACT-4
          // @TODOFO: breaking for the moment (REFACT-1)
          if (this.items[i].quality < 50) {
            this.items[i].quality++
            if (this.items[i].sellIn < 11 && this.items[i].quality < 50) this.items[i].quality++
            if (this.items[i].sellIn < 6 && this.items[i].quality < 50) this.items[i].quality++
          }

          // @TODOFO: REFACT-4
          if (this.items[i].sellIn < 0) this.items[i].quality = 0

          break;
        case ITEM.SULFURAS:
          break;
        default:
          // @TODOFO: REFACT-2
          this.items[i].sellIn--
          // @TODOFO: REFACT-0
          if (this.items[i].quality > 0) this.items[i].quality--
          // Cas pas AGED_BRIE et pas BACKSTAGE_CONCERT et pas SULFURAS et Sell-in negatif et Quality negative
          // @TODOFO: REFACT-3
          if (this.items[i].sellIn < 0 && this.items[i].quality > 0) this.items[i].quality--
          break;
      }

      if (this.items[i].name != ITEM.AGED_BRIE && this.items[i].name != ITEM.BACKSTAGE_CONCERT) {
        // @TODOFO: REFACT-0
        // Cas où l'item n'est pas AGED_BRIE et n'est pas BACKSTAGE_CONCERT => L'item est SULFURAS ou AUTRES
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            // this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else { // Cas où l'item est soit AGED_BRIE ou BACKSTAGE_CONCERT
        if (this.items[i].quality < 50) {
          // this.items[i].quality = this.items[i].quality + 1
          // @TODOFO: (REFACT-1)
          if (this.items[i].name == ITEM.BACKSTAGE_CONCERT) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                // this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                // this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      // Un item qui n'est pas SULFURAS => Un item qui est AGED_BRIE ou BACKSTAGE_CONCERT ou AUTRES
      // @TODOFO: REFACT-2
      // if (this.items[i].name != ITEM.SULFURAS) {
      //   this.items[i].sellIn = this.items[i].sellIn - 1;
      // }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != ITEM.AGED_BRIE) {
          if (this.items[i].name != ITEM.BACKSTAGE_CONCERT) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != ITEM.SULFURAS) {
                // Cas pas AGED_BRIE et pas BACKSTAGE_CONCERT et et pas SULFURAS et Sell-in negatif et Quality negative
                // @TODOFO: REFACT-3
                // this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            // Cas pas AGED_BRIE && est BACKSTAGE_CONCERT && Sell-in negatif
            // @TODOFO: REFACT-4
            // this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            // // Cas Sell-in negatif && AGED_BRIE && Quality < 50
            // @TODOFO: REFACT-5
            // this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
