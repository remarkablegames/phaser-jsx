import { GameObjects } from 'phaser';
import type { FC } from 'react';

import type { GameObjectProps as Props } from '../types';

/**
 * The Arc Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports both fill and stroke colors.
 *
 * When it renders it displays an arc shape. You can control the start and end angles of the arc, as well as if the angles are winding clockwise or anti-clockwise. With the default settings it renders as a complete circle. By changing the angles you can create other arc shapes, such as half-circles.
 *
 * Arcs also have an iterations property and corresponding setIterations method. This allows you to control how smooth the shape renders in WebGL, by controlling the number of iterations that take place during construction.
 */
export const Arc = GameObjects.Arc as unknown as FC<Props<GameObjects.Arc>>;

/**
 * BitmapText objects work by taking a texture file and an XML or JSON file that describes the font structure.
 *
 * During rendering for each letter of the text is rendered to the display, proportionally spaced out and aligned to match the font structure.
 *
 * BitmapText objects are less flexible than Text objects, in that they have less features such as shadows, fills and the ability to use Web Fonts, however you trade this flexibility for rendering speed. You can also create visually compelling BitmapTexts by processing the font texture in an image editor, applying fills and any other effects required.
 *
 * To create multi-line text insert `\r`, `\n` or `\r\n` escape codes into the text string.
 *
 * To create a BitmapText data files you need a 3rd party app such as:
 *
 * BMFont (Windows, free): http://www.angelcode.com/products/bmfont/ Glyph Designer (OS X, commercial): http://www.71squared.com/en/glyphdesigner Littera (Web-based, free): http://kvazars.com/littera/
 *
 * For most use cases it is recommended to use XML. If you wish to use JSON, the formatting should be equal to the result of converting a valid XML file through the popular X2JS library. An online tool for conversion can be found here: http://codebeautify.org/xmltojson
 */
export const BitmapText = GameObjects.BitmapText as unknown as FC<
  Props<GameObjects.BitmapText>
>;

/**
 * A Blitter Game Object.
 *
 * The Blitter Game Object is a special kind of container that creates, updates and manages Bob objects. Bobs are designed for rendering speed rather than flexibility. They consist of a texture, or frame from a texture, a position and an alpha value. You cannot scale or rotate them. They use a batched drawing method for speed during rendering.
 *
 * A Blitter Game Object has one texture bound to it. Bobs created by the Blitter can use any Frame from this Texture to render with, but they cannot use any other Texture. It is this single texture-bind that allows them their speed.
 *
 * If you have a need to blast a large volume of frames around the screen then Blitter objects are well worth investigating. They are especially useful for using as a base for your own special effects systems.
 */
export const Blitter = GameObjects.Blitter as unknown as FC<
  Props<GameObjects.Blitter>
>;

/**
 * A Bob Game Object.
 *
 * A Bob belongs to a Blitter Game Object. The Blitter is responsible for managing and rendering this object.
 *
 * A Bob has a position, alpha value and a frame from a texture that it uses to render with. You can also toggle the flipped and visible state of the Bob. The Frame the Bob uses to render can be changed dynamically, but it must be a Frame within the Texture used by the parent Blitter.
 *
 * Bob positions are relative to the Blitter parent. So if you move the Blitter parent, all Bob children will have their positions impacted by this change as well.
 *
 * You can manipulate Bob objects directly from your game code, but the creation and destruction of them should be handled via the Blitter parent.
 */
export const Bob = GameObjects.Bob as unknown as FC<
  Props<GameObjects.Bob> & {
    frame: string | number;
  }
>;

/**
 * A Container Game Object.
 *
 * A Container, as the name implies, can 'contain' other types of Game Object. When a Game Object is added to a Container, the Container becomes responsible for the rendering of it. By default it will be removed from the Display List and instead added to the Containers own internal list.
 *
 * The position of the Game Object automatically becomes relative to the position of the Container.
 *
 * The origin of a Container is 0x0 (in local space) and that cannot be changed. The children you add to the Container should be positioned with this value in mind. I.e. you should treat 0x0 as being the center of the Container, and position children positively and negative around it as required.
 *
 * When the Container is rendered, all of its children are rendered as well, in the order in which they exist within the Container. Container children can be repositioned using methods such as MoveUp, MoveDown and SendToBack.
 *
 * If you modify a transform property of the Container, such as Container.x or Container.rotation then it will automatically influence all children as well.
 *
 * Containers can include other Containers for deeply nested transforms.
 *
 * Containers can have masks set on them and can be used as a mask too. However, Container children cannot be masked. The masks do not 'stack up'. Only a Container on the root of the display list will use its mask.
 *
 * Containers can be enabled for input. Because they do not have a texture you need to provide a shape for them to use as their hit area. Container children can also be enabled for input, independent of the Container.
 *
 * If input enabling a child you should not set both the origin and a negative scale factor on the child, or the input area will become misaligned.
 *
 * Containers can be given a physics body for either Arcade Physics, Impact Physics or Matter Physics. However, if Container children are enabled for physics you may get unexpected results, such as offset bodies, if the Container itself, or any of its ancestors, is positioned anywhere other than at 0 x 0. Container children with physics do not factor in the Container due to the excessive extra calculations needed. Please structure your game to work around this.
 *
 * It's important to understand the impact of using Containers. They add additional processing overhead into every one of their children. The deeper you nest them, the more the cost escalates. This is especially true for input events. You also loose the ability to set the display depth of Container children in the same flexible manner as those not within them. In short, don't use them for the sake of it. You pay a small cost every time you create one, try to structure your game around avoiding that where possible.
 */
export const Container = GameObjects.Container as unknown as FC<
  Props<GameObjects.Container>
>;

/**
 * The Curve Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports both fill and stroke colors.
 *
 * To render a Curve Shape you must first create a Phaser.Curves.Curve object, then pass it to the Curve Shape in the constructor.
 *
 * The Curve shape also has a smoothness property and corresponding setSmoothness method. This allows you to control how smooth the shape renders in WebGL, by controlling the number of iterations that take place during construction. Increase and decrease the default value for smoother, or more jagged, shapes.
 */
export const Curve = GameObjects.Curve as unknown as FC<
  Props<GameObjects.Curve>
>;

/**
 * DOM Element Game Objects are a way to control and manipulate HTML Elements over the top of your game.
 *
 * In order for DOM Elements to display you have to enable them by adding the following to your game configuration object:
 *
 * ```js
 * dom {
 *   createContainer: true
 * }
 * ```
 *
 * When this is added, Phaser will automatically create a DOM Container div that is positioned over the top of the game canvas. This div is sized to match the canvas, and if the canvas size changes, as a result of settings within the Scale Manager, the dom container is resized accordingly.
 *
 * If you have not already done so, you have to provide a parent in the Game Configuration, or the DOM Container will fail to be created.
 *
 * You can create a DOM Element by either passing in DOMStrings, or by passing in a reference to an existing Element that you wish to be placed under the control of Phaser. For example:
 *
 * ```js
 * this.add.dom(x, y, 'div', 'background-color: lime; width: 220px; height: 100px; font: 48px Arial', 'Phaser');
 * dd
 * ```
 *
 * The above code will insert a div element into the DOM Container at the given x/y coordinate. The DOMString in the 4th argument sets the initial CSS style of the div and the final argument is the inner text. In this case, it will create a lime colored div that is 220px by 100px in size with the text Phaser in it, in an Arial font.
 *
 * You should nearly always, without exception, use explicitly sized HTML Elements, in order to fully control alignment and positioning of the elements next to regular game content.
 *
 * Rather than specify the CSS and HTML directly you can use the load.html File Loader to load it into the cache and then use the createFromCache method instead. You can also use createFromHTML and various other methods available in this class to help construct your elements.
 *
 * Once the element has been created you can then control it like you would any other Game Object. You can set its position, scale, rotation, alpha and other properties. It will move as the main Scene Camera moves and be clipped at the edge of the canvas. It's important to remember some limitations of DOM Elements: The obvious one is that they appear above or below your game canvas. You cannot blend them into the display list, meaning you cannot have a DOM Element, then a Sprite, then another DOM Element behind it.
 *
 * They also cannot be enabled for input. To do that, you have to use the addListener method to add native event listeners directly. The final limitation is to do with cameras. The DOM Container is sized to match the game canvas entirely and clipped accordingly. DOM Elements respect camera scrolling and scrollFactor settings, but if you change the size of the camera so it no longer matches the size of the canvas, they won't be clipped accordingly.
 *
 * Also, all DOM Elements are inserted into the same DOM Container, regardless of which Scene they are created in.
 *
 * Note that you should only have DOM Elements in a Scene with a single Camera. If you require multiple cameras, use parallel scenes to achieve this.
 *
 * DOM Elements are a powerful way to align native HTML with your Phaser Game Objects. For example, you can insert a login form for a multiplayer game directly into your title screen. Or a text input box for a highscore table. Or a banner ad from a 3rd party service. Or perhaps you'd like to use them for high resolution text display and UI. The choice is up to you, just remember that you're dealing with standard HTML and CSS floating over the top of your game, and should treat it accordingly.
 */
export const DOMElement = GameObjects.DOMElement as unknown as FC<
  Props<GameObjects.DOMElement>
>;

/**
 * The Display List plugin.
 *
 * Display Lists belong to a Scene and maintain the list of Game Objects to render every frame.
 *
 * Some of these Game Objects may also be part of the Scene's Update List, for updating.
 */
export const DisplayList = GameObjects.DisplayList as unknown as FC<
  Props<GameObjects.DisplayList>
>;

/**
 * BitmapText objects work by taking a texture file and an XML or JSON file that describes the font structure.
 *
 * During rendering for each letter of the text is rendered to the display, proportionally spaced out and aligned to match the font structure.
 *
 * Dynamic Bitmap Text objects are different from Static Bitmap Text in that they invoke a callback for each letter being rendered during the render pass. This callback allows you to manipulate the properties of each letter being rendered, such as its position, scale or tint, allowing you to create interesting effects like jiggling text, which can't be done with Static text. This means that Dynamic Text takes more processing time, so only use them if you require the callback ability they have.
 *
 * BitmapText objects are less flexible than Text objects, in that they have less features such as shadows, fills and the ability to use Web Fonts, however you trade this flexibility for rendering speed. You can also create visually compelling BitmapTexts by processing the font texture in an image editor, applying fills and any other effects required.
 *
 * To create multi-line text insert `\r`, `\n` or `\r\n` escape codes into the text string.
 *
 * To create a BitmapText data files you need a 3rd party app such as:
 *
 * BMFont (Windows, free): http://www.angelcode.com/products/bmfont/ Glyph Designer (OS X, commercial): http://www.71squared.com/en/glyphdesigner Littera (Web-based, free): http://kvazars.com/littera/
 *
 * For most use cases it is recommended to use XML. If you wish to use JSON, the formatting should be equal to the result of converting a valid XML file through the popular X2JS library. An online tool for conversion can be found here: http://codebeautify.org/xmltojson
 */
export const DynamicBitmapText = GameObjects.DynamicBitmapText as unknown as FC<
  Props<GameObjects.DynamicBitmapText>
>;

/**
 * The Ellipse Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports both fill and stroke colors.
 *
 * When it renders it displays an ellipse shape. You can control the width and height of the ellipse. If the width and height match it will render as a circle. If the width is less than the height, it will look more like an egg shape.
 *
 * The Ellipse shape also has a smoothness property and corresponding setSmoothness method. This allows you to control how smooth the shape renders in WebGL, by controlling the number of iterations that take place during construction. Increase and decrease the default value for smoother, or more jagged, shapes.
 */
export const Ellipse = GameObjects.Ellipse as unknown as FC<
  Props<GameObjects.Ellipse>
>;

/**
 * An Extern Game Object is a special type of Game Object that allows you to pass rendering off to a 3rd party.
 *
 * When you create an Extern and place it in the display list of a Scene, the renderer will process the list as usual. When it finds an Extern it will flush the current batch, clear down the pipeline and prepare a transform matrix which your render function can take advantage of, if required.
 *
 * The WebGL context is then left is a 'clean' state, ready for you to bind your own shaders, or draw to it, whatever you wish to do. Once you've finished, you should free-up any of your resources. The Extern will then rebind the Phaser pipeline and carry on rendering the display list.
 *
 * Although this object has lots of properties such as Alpha, Blend Mode and Tint, none of them are used during rendering unless you take advantage of them in your own render code.
 */
export const Extern = GameObjects.Extern as unknown as FC<
  Props<GameObjects.Extern>
>;

/**
 * The base class that all Game Objects extend. You don't create GameObjects directly and they cannot be added to the display list. Instead, use them as the base for your own custom classes.
 */
export const GameObject = GameObjects.GameObject as unknown as FC<
  Props<GameObjects.GameObject>
>;

/**
 * The Game Object Creator is a Scene plugin that allows you to quickly create many common types of Game Objects and return them using a configuration object, rather than having to specify a limited set of parameters such as with the GameObjectFactory.
 *
 * Game Objects made via this class are automatically added to the Scene and Update List unless you explicitly set the add property in the configuration object to false.
 */
export const GameObjectCreator = GameObjects.GameObjectCreator as unknown as FC<
  Props<GameObjects.GameObjectCreator>
>;

/**
 * The Game Object Factory is a Scene plugin that allows you to quickly create many common types of Game Objects and have them automatically registered with the Scene.
 *
 * Game Objects directly register themselves with the Factory and inject their own creation methods into the class.
 */
export const GameObjectFactory = GameObjects.GameObjectFactory as unknown as FC<
  Props<GameObjects.GameObjectFactory>
>;

/**
 * A Graphics object is a way to draw primitive shapes to your game. Primitives include forms of geometry, such as Rectangles, Circles, and Polygons. They also include lines, arcs and curves. When you initially create a Graphics object it will be empty.
 *
 * To draw to it you must first specify a line style or fill style (or both), draw shapes using paths, and finally fill or stroke them. For example:
 *
 * ```js
 * graphics.lineStyle(5, 0xFF00FF, 1.0);
 * graphics.beginPath();
 * graphics.moveTo(100, 100);
 * graphics.lineTo(200, 200);
 * graphics.closePath();
 * graphics.strokePath();
 * ```
 *
 * There are also many helpful methods that draw and fill/stroke common shapes for you.
 *
 * ```js
 * graphics.lineStyle(5, 0xFF00FF, 1.0);
 * graphics.fillStyle(0xFFFFFF, 1.0);
 * graphics.fillRect(50, 50, 400, 200);
 * graphics.strokeRect(50, 50, 400, 200);
 * ```
 *
 * When a Graphics object is rendered it will render differently based on if the game is running under Canvas or WebGL. Under Canvas it will use the HTML Canvas context drawing operations to draw the path. Under WebGL the graphics data is decomposed into polygons. Both of these are expensive processes, especially with complex shapes.
 *
 * If your Graphics object doesn't change much (or at all) once you've drawn your shape to it, then you will help performance by calling Phaser.GameObjects.Graphics#generateTexture. This will 'bake' the Graphics object into a Texture, and return it. You can then use this Texture for Sprites or other display objects. If your Graphics object updates frequently then you should avoid doing this, as it will constantly generate new textures, which will consume memory.
 *
 * As you can tell, Graphics objects are a bit of a trade-off. While they are extremely useful, you need to be careful in their complexity and quantity of them in your game.
 */
export const Graphics = GameObjects.Graphics as unknown as FC<
  Props<GameObjects.Graphics>
>;

/**
 * The Grid Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports only fill colors and cannot be stroked.
 *
 * A Grid Shape allows you to display a grid in your game, where you can control the size of the grid as well as the width and height of the grid cells. You can set a fill color for each grid cell as well as an alternate fill color. When the alternate fill color is set then the grid cells will alternate the fill colors as they render, creating a chess-board effect. You can also optionally have an outline fill color. If set, this draws lines between the grid cells in the given color. If you specify an outline color with an alpha of zero, then it will draw the cells spaced out, but without the lines between them.
 */
export const Grid = GameObjects.Grid as unknown as FC<Props<GameObjects.Grid>>;

/**
 * A Group is a way for you to create, manipulate, or recycle similar Game Objects.
 *
 * Group membership is non-exclusive. A Game Object can belong to several groups, one group, or none.
 *
 * Groups themselves aren't displayable, and can't be positioned, rotated, scaled, or hidden.
 */
export const Group = GameObjects.Group as unknown as FC<
  Props<GameObjects.Group>
>;

/**
 * An Image Game Object.
 *
 * An Image is a light-weight Game Object useful for the display of static images in your game, such as logos, backgrounds, scenery or other non-animated elements. Images can have input events and physics bodies, or be tweened, tinted or scrolled. The main difference between an Image and a Sprite is that you cannot animate an Image as they do not have the Animation component.
 */
export const Image = GameObjects.Image as unknown as FC<
  Props<GameObjects.Image> & {
    texture: string | Phaser.Textures.Texture;
    frame?: string | number;
  }
>;

/**
 * The IsoBox Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports only fill colors and cannot be stroked.
 *
 * An IsoBox is an 'isometric' rectangle. Each face of it has a different fill color. You can set the color of the top, left and right faces of the rectangle respectively. You can also choose which of the faces are rendered via the showTop, showLeft and showRight properties.
 *
 * You cannot view an IsoBox from under-neath, however you can change the 'angle' by setting the projection property.
 */
export const IsoBox = GameObjects.IsoBox as unknown as FC<
  Props<GameObjects.IsoBox>
>;

/**
 * The IsoTriangle Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports only fill colors and cannot be stroked.
 *
 * An IsoTriangle is an 'isometric' triangle. Think of it like a pyramid. Each face has a different fill color. You can set the color of the top, left and right faces of the triangle respectively You can also choose which of the faces are rendered via the showTop, showLeft and showRight properties.
 *
 * You cannot view an IsoTriangle from under-neath, however you can change the 'angle' by setting the projection property. The reversed property controls if the IsoTriangle is rendered upside down or not.
 */
export const IsoTriangle = GameObjects.IsoTriangle as unknown as FC<
  Props<GameObjects.IsoTriangle>
>;

/**
 * A Layer Game Object.
 *
 * A Layer is a special type of Game Object that acts as a Display List. You can add any type of Game Object to a Layer, just as you would to a Scene. Layers can be used to visually group together 'layers' of Game Objects:
 *
 * ```js
 * const spaceman = this.add.sprite(150, 300, 'spaceman');
 * const bunny = this.add.sprite(400, 300, 'bunny');
 * const elephant = this.add.sprite(650, 300, 'elephant');
 *
 * const layer = this.add.layer();
 *
 * layer.add([ spaceman, bunny, elephant ]);
 * ```
 *
 * The 3 sprites in the example above will now be managed by the Layer they were added to. Therefore, if you then set layer.setVisible(false) they would all vanish from the display.
 *
 * You can also control the depth of the Game Objects within the Layer. For example, calling the setDepth method of a child of a Layer will allow you to adjust the depth of that child within the Layer itself, rather than the whole Scene. The Layer, too, can have its depth set as well.
 *
 * The Layer class also offers many different methods for manipulating the list, such as the methods moveUp, moveDown, sendToBack, bringToTop and so on. These allow you to change the display list position of the Layers children, causing it to adjust the order in which they are rendered. Using setDepth on a child allows you to override this.
 *
 * Layers can have Post FX Pipelines set, which allows you to easily enable a post pipeline across a whole range of children, which, depending on the effect, can often be far more efficient that doing so on a per-child basis.
 *
 * Layers have no position or size within the Scene. This means you cannot enable a Layer for physics or input, or change the position, rotation or scale of a Layer. They also have no scroll factor, texture, tint, origin, crop or bounds.
 *
 * If you need those kind of features then you should use a Container instead. Containers can be added to Layers, but Layers cannot be added to Containers.
 *
 * However, you can set the Alpha, Blend Mode, Depth, Mask and Visible state of a Layer. These settings will impact all children being rendered by the Layer.
 */
export const Layer = GameObjects.Layer as unknown as FC<
  Props<GameObjects.Layer>
>;

/**
 * A Scene plugin that provides a Phaser.GameObjects.LightsManager for the Light2D pipeline.
 */
export const Light = GameObjects.Light as unknown as FC<
  Props<GameObjects.Light>
>;

/**
 * Manages Lights for a Scene.
 *
 * Affects the rendering of Game Objects using the Light2D pipeline.
 */
export const LightsManager = GameObjects.LightsManager as unknown as FC<
  Props<GameObjects.LightsManager>
>;

/**
 * A Scene plugin that provides a Phaser.GameObjects.LightsManager for the Light2D pipeline.
 *
 * Available from within a Scene via this.lights.
 *
 * Add Lights using the Phaser.GameObjects.LightsManager#addLight method:
 *
 * ```js
 * // Enable the Lights Manager because it is disabled by default
 * this.lights.enable();
 *
 * // Create a Light at [400, 300] with a radius of 200
 * this.lights.addLight(400, 300, 200);
 * ```
 *
 * For Game Objects to be affected by the Lights when rendered, you will need to set them to use the Light2D pipeline like so:
 *
 * ```js
 * sprite.setPipeline('Light2D');
 * ```
 *
 * Note that you cannot use this pipeline on Graphics Game Objects or Shape Game Objects.
 */
export const LightsPlugin = GameObjects.LightsPlugin as unknown as FC<
  Props<GameObjects.LightsPlugin>
>;

/**
 * The Line Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports only stroke colors and cannot be filled.
 *
 * A Line Shape allows you to draw a line between two points in your game. You can control the stroke color and thickness of the line. In WebGL only you can also specify a different thickness for the start and end of the line, allowing you to render lines that taper-off.
 *
 * If you need to draw multiple lines in a sequence you may wish to use the Polygon Shape instead.
 *
 * Be aware that as with all Game Objects the default origin is 0.5. If you need to draw a Line between two points and want the x1/y1 values to match the x/y values, then set the origin to 0.
 */
export const Line = GameObjects.Line as unknown as FC<Props<GameObjects.Line>>;

/**
 * A Mesh Game Object.
 *
 * The Mesh Game Object allows you to render a group of textured vertices and manipulate the view of those vertices, such as rotation, translation or scaling.
 *
 * Support for generating mesh data from grids, model data or Wavefront OBJ Files is included.
 *
 * Although you can use this to render 3D objects, its primary use is for displaying more complex Sprites, or Sprites where you need fine-grained control over the vertice positions in order to achieve special effects in your games. Note that rendering still takes place using Phasers orthographic camera. As a result, all depth and face tests are done in orthographic space.
 *
 * The rendering process will iterate through the faces of this Mesh and render out each face that is considered as being in view of the camera. No depth buffer is used, and because of this, you should be careful not to use model data with too many vertices, or overlapping geometry, or you'll probably encounter z-depth fighting. The Mesh was designed to allow for more advanced 2D layouts, rather than displaying 3D objects, even though it can do this to a degree.
 *
 * In short, if you want to remake Crysis, use a 3D engine, not a Mesh. However, if you want to easily add some small fun 3D elements into your game, or create some special effects involving vertex warping, this is the right object for you. Mesh data becomes part of the WebGL batch, just like standard Sprites, so doesn't introduce any additional shader overhead. Because the Mesh just generates vertices into the WebGL batch, like any other Sprite, you can use all of the common Game Object components on a Mesh too, such as a custom pipeline, mask, blend mode or texture.
 *
 * Note that the Mesh object is WebGL only and does not have a Canvas counterpart.
 *
 * The Mesh origin is always 0.5 x 0.5 and cannot be changed.
 */
export const Mesh = GameObjects.Mesh as unknown as FC<Props<GameObjects.Mesh>>;

/**
 * A Nine Slice Game Object allows you to display a texture-based object that
 * can be stretched both horizontally and vertically, but that retains
 * fixed-sized corners. The dimensions of the corners are set via the
 * parameters to this class.
 *
 * This is extremely useful for UI and button like elements, where you need
 * them to expand to accommodate the content without distorting the texture.
 *
 * The texture you provide for this Game Object should be based on the
 * following layout structure:
 *
 * ```
 *      A                          B
 *    +---+----------------------+---+
 *  C | 1 |          2           | 3 |
 *    +---+----------------------+---+
 *    |   |                      |   |
 *    | 4 |          5           | 6 |
 *    |   |                      |   |
 *    +---+----------------------+---+
 *  D | 7 |          8           | 9 |
 *    +---+----------------------+---+
 * ```
 *
 * When changing this objects width and / or height:
 *
 *     areas 1, 3, 7 and 9 (the corners) will remain unscaled
 *     areas 2 and 8 will be stretched horizontally only
 *     areas 4 and 6 will be stretched vertically only
 *     area 5 will be stretched both horizontally and vertically
 *
 * You can also create a 3 slice Game Object:
 *
 * This works in a similar way, except you can only stretch it horizontally.
 * Therefore, it requires less configuration:
 *
 * ```
 *      A                          B
 *    +---+----------------------+---+
 *    |   |                      |   |
 *  C | 1 |          2           | 3 |
 *    |   |                      |   |
 *    +---+----------------------+---+
 * ```
 *
 * When changing this objects width (you cannot change its height)
 *
 *     areas 1 and 3 will remain unscaled
 *     area 2 will be stretched horizontally
 *
 * The above configuration concept is adapted from the Pixi NineSlicePlane.
 *
 * To specify a 3 slice object instead of a 9 slice you should only
 * provide the `leftWidth` and `rightWidth` parameters. To create a 9 slice
 * you must supply all parameters.
 *
 * The _minimum_ width this Game Object can be is the total of
 * `leftWidth` + `rightWidth`.  The _minimum_ height this Game Object
 * can be is the total of `topHeight` + `bottomHeight`.
 * If you need to display this object at a smaller size, you can scale it.
 *
 * In terms of performance, using a 3 slice Game Object is the equivalent of
 * having 3 Sprites in a row. Using a 9 slice Game Object is the equivalent
 * of having 9 Sprites in a row. The vertices of this object are all batched
 * together and can co-exist with other Sprites and graphics on the display
 * list, without incurring any additional overhead.
 *
 * As of Phaser 3.60 this Game Object is WebGL only.
 *
 * As of Phaser 3.70 this Game Object can now populate its values automatically
 * if they have been set within Texture Packer 7.1.0 or above and exported with
 * the atlas json. If this is the case, you can just call this method without
 * specifying anything more than the texture key and frame and it will pull the
 * area data from the atlas.
 */
export const NineSlice = GameObjects.NineSlice as unknown as FC<
  Props<GameObjects.NineSlice>
>;

/**
 * A particle emitter represents a single particle stream. It controls a pool of Particles and is controlled by a Particle Emitter Manager.
 */
export const ParticleEmitter = GameObjects.Particles
  .ParticleEmitter as unknown as FC<
  Props<GameObjects.Particles.ParticleEmitter>
>;

/**
 * A PathFollower Game Object.
 *
 * A PathFollower is a Sprite Game Object with some extra helpers to allow it to follow a Path automatically.
 *
 * Anything you can do with a standard Sprite can be done with this PathFollower, such as animate it, tint it, scale it and so on.
 *
 * PathFollowers are bound to a single Path at any one time and can traverse the length of the Path, from start to finish, forwards or backwards, or from any given point on the Path to its end. They can optionally rotate to face the direction of the path, be offset from the path coordinates or rotate independently of the Path.
 */
export const PathFollower = GameObjects.PathFollower as unknown as FC<
  Props<GameObjects.PathFollower>
>;

/**
 * A Plane Game Object.
 *
 * The Plane Game Object is a helper class that takes the Mesh Game Object and extends it, allowing for fast and easy creation of Planes. A Plane is a one-sided grid of cells, where you specify the number of cells in each dimension. The Plane can have a texture that is either repeated (tiled) across each cell, or applied to the full Plane.
 *
 * The Plane can then be manipulated in 3D space, with rotation across all 3 axis.
 *
 * This allows you to create effects not possible with regular Sprites, such as perspective distortion. You can also adjust the vertices on a per-vertex basis. Plane data becomes part of the WebGL batch, just like standard Sprites, so doesn't introduce any additional shader overhead. Because the Plane just generates vertices into the WebGL batch, like any other Sprite, you can use all of the common Game Object components on a Plane too, such as a custom pipeline, mask, blend mode or texture.
 *
 * You can use the uvScroll and uvScale methods to adjust the placement and scaling of the texture if this Plane is using a single texture, and not a frame from a texture atlas or sprite sheet.
 *
 * The Plane Game Object also has the Animation component, allowing you to play animations across the Plane just as you would with a Sprite.
 *
 * Note that the Plane object is WebGL only and does not have a Canvas counterpart.
 *
 * The Plane origin is always 0.5 x 0.5 and cannot be changed.
 */
export const Plane = GameObjects.Plane as unknown as FC<
  Props<GameObjects.Plane>
>;

/**
 * The Point Light Game Object provides a way to add a point light effect into your game, without the expensive shader processing requirements of the traditional Light Game Object.
 *
 * The difference is that the Point Light renders using a custom shader, designed to give the impression of a point light source, of variable radius, intensity and color, in your game. However, unlike the Light Game Object, it does not impact any other Game Objects, or use their normal maps for calcuations. This makes them extremely fast to render compared to Lights and perfect for special effects, such as flickering torches or muzzle flashes.
 *
 * For maximum performance you should batch Point Light Game Objects together. This means ensuring they follow each other consecutively on the display list. Ideally, use a Layer Game Object and then add just Point Lights to it, so that it can batch together the rendering of the lights. You don't have to do this, and if you've only a handful of Point Lights in your game then it's perfectly safe to mix them into the dislay list as normal. However, if you're using a large number of them, please consider how they are mixed into the display list.
 *
 * The renderer will automatically cull Point Lights. Those with a radius that does not intersect with the Camera will be skipped in the rendering list. This happens automatically and the culled state is refreshed every frame, for every camera.
 *
 * The origin of a Point Light is always 0.5 and it cannot be changed.
 *
 * Point Lights are a WebGL only feature and do not have a Canvas counterpart.
 */
export const PointLight = GameObjects.PointLight as unknown as FC<
  Props<GameObjects.PointLight>
>;

/**
 * The Polygon Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports both fill and stroke colors.
 *
 * The Polygon Shape is created by providing a list of points, which are then used to create an internal Polygon geometry object. The points can be set from a variety of formats:
 *
 * - A string containing paired values separated by a single space: '40 0 40 20 100 20 100 80 40 80 40 100 0 50'
 * - An array of Point or Vector2 objects: [new Phaser.Math.Vector2(x1, y1), ...]
 * - An array of objects with public x/y properties: [obj1, obj2, ...]
 * - An array of paired numbers that represent point coordinates: [x1,y1, x2,y2, ...]
 * - An array of arrays with two elements representing x/y coordinates: [[x1, y1], [x2, y2], ...]
 *
 * By default the x and y coordinates of this Shape refer to the center of it. However, depending on the coordinates of the points provided, the final shape may be rendered offset from its origin.
 */
export const Polygon = GameObjects.Polygon as unknown as FC<
  Props<GameObjects.Polygon>
>;

/**
 * The Rectangle Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports both fill and stroke colors.
 *
 * You can change the size of the rectangle by changing the `width` and `height` properties.
 */
export const Rectangle = GameObjects.Rectangle as unknown as FC<
  Props<GameObjects.Rectangle>
>;

/**
 * A Render Texture.
 *
 * A Render Texture is a special texture that allows any number of Game Objects to be drawn to it. You can take many complex objects and draw them all to this one texture, which can they be used as the texture for other Game Object's. It's a way to generate dynamic textures at run-time that are WebGL friendly and don't invoke expensive GPU uploads.
 *
 * Note that under WebGL a FrameBuffer, which is what the Render Texture uses internally, cannot be anti-aliased. This means that when drawing objects such as Shapes to a Render Texture they will appear to be drawn with no aliasing, however this is a technical limitation of WebGL. To get around it, create your shape as a texture in an art package, then draw that to the Render Texture.
 */
export const RenderTexture = GameObjects.RenderTexture as unknown as FC<
  Props<GameObjects.RenderTexture>
>;

/**
 * A Rope Game Object.
 *
 * The Rope object is WebGL only and does not have a Canvas counterpart.
 *
 * A Rope is a special kind of Game Object that has a texture that repeats along its entire length. Unlike a Sprite, it isn't restricted to using just a quad and can have as many vertices as you define when creating it. The vertices can be arranged in a horizontal or vertical strip and have their own color and alpha values as well.
 *
 * A Ropes origin is always 0.5 x 0.5 and cannot be changed.
 */
export const Rope = GameObjects.Rope as unknown as FC<Props<GameObjects.Rope>>;

/**
 * A Shader Game Object.
 *
 * This Game Object allows you to easily add a quad with its own shader into the display list, and manipulate it as you would any other Game Object, including scaling, rotating, positioning and adding to Containers. Shaders can be masked with either Bitmap or Geometry masks and can also be used as a Bitmap Mask for a Camera or other Game Object. They can also be made interactive and used for input events.
 */
export const Shader = GameObjects.Shader as unknown as FC<
  Props<GameObjects.Shader>
>;

/**
 * The Shape Game Object is a base class for the various different shapes, such as the Arc, Star or Polygon. You cannot add a Shape directly to your Scene, it is meant as a base for your own custom Shape classes.
 */
export const Shape = GameObjects.Shape as unknown as FC<
  Props<GameObjects.Shape>
>;

/**
 * A Sprite Game Object.
 *
 * A Sprite Game Object is used for the display of both static and animated images in your game. Sprites can have input events and physics bodies. They can also be tweened, tinted, scrolled and animated.
 *
 * The main difference between a Sprite and an Image Game Object is that you cannot animate Images. As such, Sprites take a fraction longer to process and have a larger API footprint due to the Animation Component. If you do not require animation then you can safely use Images to replace Sprites in all cases.
 */
export const Sprite = GameObjects.Sprite as unknown as FC<
  Props<GameObjects.Sprite> & {
    texture: string | Phaser.Textures.Texture;
    frame?: string | number;
  }
>;

/**
 * The Star Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports both fill and stroke colors.
 *
 * As the name implies, the Star shape will display a star in your game. You can control several aspects of it including the number of points that constitute the star. The default is 5. If you change it to 4 it will render as a diamond. If you increase them, you'll get a more spiky star shape.
 *
 * You can also control the inner and outer radius, which is how 'long' each point of the star is. Modify these values to create more interesting shapes.
 */
export const Star = GameObjects.Star as unknown as FC<Props<GameObjects.Star>>;

/**
 * A Text Game Object.
 *
 * Text objects work by creating their own internal hidden Canvas and then renders text to it using the standard Canvas fillText API. It then creates a texture from this canvas which is rendered to your game during the render pass.
 *
 * Because it uses the Canvas API you can take advantage of all the features this offers, such as applying gradient fills to the text, or strokes, shadows and more. You can also use custom fonts loaded externally, such as Google or TypeKit Web fonts.
 *
 * Important: The font name must be quoted if it contains certain combinations of digits or special characters, either when creating the Text object, or when setting the font via setFont or setFontFamily, e.g.:
 *
 * ```js
 * this.add.text(0, 0, 'Hello World', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
 * ```
 *
 * ```js
 * this.add.text(0, 0, 'Hello World', { font: '"Press Start 2P"' });
 * ```
 *
 * You can only display fonts that are currently loaded and available to the browser: therefore fonts must be pre-loaded. Phaser does not do ths for you, so you will require the use of a 3rd party font loader, or have the fonts ready available in the CSS on the page in which your Phaser game resides.
 *
 * See this compatibility table for the available default fonts across mobile browsers.
 *
 * A note on performance: Every time the contents of a Text object changes, i.e. changing the text being displayed, or the style of the text, it needs to remake the Text canvas, and if on WebGL, re-upload the new texture to the GPU. This can be an expensive operation if used often, or with large quantities of Text objects in your game. If you run into performance issues you would be better off using Bitmap Text instead, as it benefits from batching and avoids expensive Canvas API calls.
 */
export const Text = GameObjects.Text as unknown as FC<
  Props<GameObjects.Text> & {
    style?: Phaser.Types.GameObjects.Text.TextStyle;
  }
>;

/**
 * A TextStyle class manages all of the style settings for a Text object.
 *
 * Text Game Objects create a TextStyle instance automatically, which is accessed via the Text.style property. You do not normally need to instantiate one yourself.
 */
export const TextStyle = GameObjects.TextStyle as unknown as FC<
  Props<GameObjects.TextStyle>
>;

/**
 * A TileSprite is a Sprite that has a repeating texture.
 *
 * The texture can be scrolled and scaled independently of the TileSprite itself. Textures will automatically wrap and are designed so that you can create game backdrops using seamless textures as a source.
 *
 * You shouldn't ever create a TileSprite any larger than your actual canvas size. If you want to create a large repeating background that scrolls across the whole map of your game, then you create a TileSprite that fits the canvas size and then use the tilePosition property to scroll the texture as the player moves. If you create a TileSprite that is thousands of pixels in size then it will consume huge amounts of memory and cause performance issues. Remember: use tilePosition to scroll your texture and tileScale to adjust the scale of the texture - don't resize the sprite itself or make it larger than it needs.
 *
 * An important note about Tile Sprites and NPOT textures: Internally, TileSprite textures use GL_REPEAT to provide seamless repeating of the textures. This, combined with the way in which the textures are handled in WebGL, means they need to be POT (power-of-two) sizes in order to wrap. If you provide a NPOT (non power-of-two) texture to a TileSprite it will generate a POT sized canvas and draw your texture to it, scaled up to the POT size. It's then scaled back down again during rendering to the original dimensions. While this works, in that it allows you to use any size texture for a Tile Sprite, it does mean that NPOT textures are going to appear anti-aliased when rendered, due to the interpolation that took place when it was resized into a POT texture. This is especially visible in pixel art graphics. If you notice it and it becomes an issue, the only way to avoid it is to ensure that you provide POT textures for Tile Sprites.
 */
export const TileSprite = GameObjects.TileSprite as unknown as FC<
  Props<GameObjects.TileSprite>
>;

/**
 * The Triangle Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports both fill and stroke colors.
 *
 * The Triangle consists of 3 lines, joining up to form a triangular shape. You can control the position of each point of these lines. The triangle is always closed and cannot have an open face. If you require that, consider using a Polygon instead.
 */
export const Triangle = GameObjects.Triangle as unknown as FC<
  Props<GameObjects.Triangle>
>;

/**
 * The Update List plugin.
 *
 * Update Lists belong to a Scene and maintain the list Game Objects to be updated every frame.
 *
 * Some or all of these Game Objects may also be part of the Scene's Display List, for Rendering.
 */
export const UpdateList = GameObjects.UpdateList as unknown as FC<
  Props<GameObjects.UpdateList>
>;

/**
 * A Video Game Object.
 *
 * This Game Object is capable of handling playback of a previously loaded video from the Phaser Video Cache, or playing a video based on a given URL. Videos can be either local, or streamed.
 */
export const Video = GameObjects.Video as unknown as FC<
  Props<GameObjects.Video>
>;

/**
 * A Zone Game Object.
 *
 * A Zone is a non-rendering rectangular Game Object that has a position and size. It has no texture and never displays, but does live on the display list and can be moved, scaled and rotated like any other Game Object.
 *
 * Its primary use is for creating Drop Zones and Input Hit Areas and it has a couple of helper methods specifically for this. It is also useful for object overlap checks, or as a base for your own non-displaying Game Objects. The default origin is 0.5, the center of the Zone, the same as with Game Objects.
 */
export const Zone = GameObjects.Zone as unknown as FC<Props<GameObjects.Zone>>;
