import { verify } from 'approvals';
import { Item, GildedRose } from '../../app/gilded-rose';

const arrayToString = array => array.map(item => `['${item.name}'], ${item.sellIn}, ${item.quality}`).join('\n')

const updateQualityGenerator = (name, sellIn, quality) => {
  const items = Array<Item>();
  items.push(new Item(name, sellIn, quality))
  const guildedRose = new GildedRose(items)
  guildedRose.updateQuality()

  return arrayToString(guildedRose.items[0])
}

fdescribe('Gilded Rose', () => {
    it('should have a golden master output', () => {
      // Create an array of items
      const items: Item[] = [
        new Item('foo', 0, 0),
        new Item('foo', -9, 10),
        new Item('foo', 0, 51),
        new Item('foo', 4, 48),
        new Item('Aged Brie', 2, 0),
        new Item('Aged Brie', 2, 40),
        new Item('Aged Brie', 12, 0),
        new Item('Sulfuras, Hand of Ragnaros', 0, 80),
        new Item('Sulfuras, Hand of Ragnaros', -15, 20),
        new Item('Sulfuras, Hand of Ragnaros', 15, 20),
        new Item('Sulfuras, Hand of Ragnaros', 5, 20),
        new Item('Sulfuras, Hand of Ragnaros', 5, 49),
        new Item('Sulfuras, Hand of Ragnaros', 10, 20),
        new Item('Sulfuras, Hand of Ragnaros', 10, 49),
        new Item('Backstage passes to a TAFKAL80ETC concert', -15, 20),
        new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20),
        new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
        new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20),
        new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49)
      ];

      // Create a new GildedRose instance
      const gildedRose = new GildedRose(items);
  
      // Update the items for one day
      gildedRose.updateQuality();
  
      // Verify the output using the 'verify' function
      verify(__dirname, 'approval-test', arrayToString(items));
      // @TODOFO: alright, maybe recode a verifyAllCombination function since apparently that's too much to ask from this dunk-ass lib.
      // verifyAllCombinations2(updateQualityGenerator, 'foo', 0, 0)
    });
  });
