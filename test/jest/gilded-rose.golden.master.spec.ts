import { Item, GildedRose } from '@/gilded-rose'
import { ERRORS } from '@/errors.enum'

/**

Pretty simple, right? Well this is where it gets interesting:

“Backstage passes”, like aged brie, increases in Quality as it’s SellIn value approaches Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert


We have recently signed a supplier of conjured items. This requires an update to our system:
“Conjured” items degrade in Quality twice as fast as normal items
Feel free to make any changes to the UpdateQuality method and add any new code as long as everything still works correctly. However, do not alter the Item class or Items property as those belong to the goblin in the corner who will insta-rage and one-shot you as he doesn’t believe in shared code ownership (you can make the UpdateQuality method and Items property static if you like, we’ll cover for you).
 */

describe('Item', () => {
  it('Should have a Quality value which denotes how valuable it is', () => {
    const item = new Item('newItem', 20, 7)
    expect(item.quality).toEqual(7)
  })

  it('Should throw an error if Quality value is not specified for an item', () => {
    expect(() => new Item('name', 10, undefined)).toThrow(ERRORS.QUALITY_NOT_SPECIFIED)
  })
})

describe('Updating items', () => {
  it('Should lower both values for both values (Quality and Sellin) at the end of the day', () => {
    const initialQuality = 3
    const initialSellIn = 20
    const item = new Item('randomNewItem', initialSellIn, initialQuality)
    const gildyRose = new GildedRose([item])
    
    gildyRose.updateQuality()
    expect(item.quality).toBe(initialQuality - 1)
    expect(item.sellIn).toBe(initialSellIn - 1)
  })
  
  it('Should degrade the Quality twice as fast if the Sellin period is zero', () => {
    const initialQuality = 10
    const hyperDegradingItem = new Item('hyperDegradingItem', 0, initialQuality)
    const theEncoreFraisItem = new Item('theEncoreFraisItem', 5, initialQuality)
    const gildyRosy = new GildedRose([hyperDegradingItem, theEncoreFraisItem])
    
    gildyRosy.updateQuality()
    
    expect(hyperDegradingItem.quality).toBe(initialQuality - 2)
    expect(theEncoreFraisItem.quality).toBe(initialQuality - 1)
  })
  
  it('Should maintain quality at zero if it is already zero', () => {
    const initialQuality = 0
    const justExpiredItem = new Item('justExperiedItem', 5, initialQuality)
    const gwandoRosaline = new GildedRose([justExpiredItem])

    gwandoRosaline.updateQuality()

    expect(justExpiredItem.quality).toBe(initialQuality)
  })

  it('Should not initialize an item to a negative Quality', () => {
    expect(() => new Item('negativeItem', 5, -1)).toThrow(ERRORS.QUALITY_NEGATIVE_INIT)
  })

  it('Should increase Quality of "Aged Brie" as it gets older (beyond 50 days sellIn days)', () => {
    const initialQuality = 49
    const sellIn = -7
    const agedBriedItem = new Item('Aged Brie', sellIn, initialQuality)
    const fromageDoreeInn = new GildedRose([agedBriedItem])

    fromageDoreeInn.updateQuality()

    expect(agedBriedItem.quality).toBe(initialQuality + 1)
  })

  it('Should not create an item with a quality superior to 50', () => {
    const tooMuchQuality = 52
    const overMaxItem = new Item('maxLimitItem', 10, tooMuchQuality)

    expect(overMaxItem.quality).toBe(50)
  })

  it('Should not drive quality above 50', () => {
    const initialQuality = 49
    const sellIn = 10
    const wowItem = new Item('Aged Brie', sellIn, initialQuality)
    const goldenRose = new GildedRose([wowItem])

    goldenRose.updateQuality()
    
    expect(wowItem.quality).toBe(50)
    
    goldenRose.updateQuality()
    
    expect(wowItem.quality).toBe(50)
  })

  it('Should never decrease the Quality of "Sulfuras, Hand of Ragnaros" item for it is legendary', () => {
    const initialQuality = 47
    const sellIn = 10
    const sulfurasItem = new Item('Sulfuras, Hand of Ragnaros', sellIn, initialQuality)
    const goldenRose = new GildedRose([sulfurasItem])

    goldenRose.updateQuality()

    expect(sulfurasItem.quality).toBe(initialQuality)    
  })

  it('Should never decrease the Quality of "Sulfuras, Hand of Ragnaros" even after Sell in goes negative', () => {
    const initialQuality = 47
    const sellIn = -10
    const sulfurasItem = new Item('Sulfuras, Hand of Ragnaros', sellIn, initialQuality)
    const goldenRose = new GildedRose([sulfurasItem])

    goldenRose.updateQuality()

    expect(sulfurasItem.quality).toBe(initialQuality)    
  })

  it('Should increase quality by 2 for "Backstage passes to a TAFKAL80ETC concert" when there are 10-5 days sell in remaining', () => {
    const initialQuality = 30
    const sellIn = 9
    const backstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, initialQuality)
    const goldenRose = new GildedRose([backstageItem])

    goldenRose.updateQuality()

    expect(backstageItem.quality).toBe(initialQuality + 2)
  })

  it('Should increase quality by 3 for "Backstage passes to a TAFKAL80ETC concert" when there are strictly less than 6 days sell in remaining', () => {
    const initialQuality = 37
    const sellIn = 4
    const backstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, initialQuality)
    const goldenRose = new GildedRose([backstageItem])

    goldenRose.updateQuality()

    expect(backstageItem.quality).toBe(initialQuality + 3)
  })

  it('Should drop Quality of "Backstage passes to a TAFKAL80ETC concert" to zero after Sell in gets under zero', () => {
    const initialQuality = 39
    const sellIn = 0
    const backstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, initialQuality)
    const goldenRose = new GildedRose([backstageItem])

    goldenRose.updateQuality()

    expect(backstageItem.quality).toBe(0)
  })

  it('Coverage: "Backstage passes to a TAFKAL80ETC concert" with quality above 50', () => {
    const initialQuality = 50
    const sellIn = 20
    const backstageItem = new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, initialQuality)
    const goldenRose = new GildedRose([backstageItem])

    goldenRose.updateQuality()

    expect(backstageItem.quality).toBe(initialQuality)
  })

  it('Coverage: "Aged Brie" with quality above 50', () => {
    const initialQuality = 50
    const sellIn = 20
    const agedBrieItem = new Item('Aged Brie', sellIn, initialQuality)
    const goldenRose = new GildedRose([agedBrieItem])

    goldenRose.updateQuality()

    expect(agedBrieItem.quality).toBe(initialQuality)
  })
})
