import { GameObjects } from 'phaser';
import type { FC } from 'react';

import type { GameObjectProps as Props } from '../types';

/**
 * Creates a React functional component from a Phaser GameObject constructor.
 */
const createComponent = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Constructor: new (...args: any[]) => T,
): FC<Props<T>> => Constructor as unknown as FC<Props<T>>;

/**
 * The Arc Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports both fill and stroke colors.
 *
 * When it renders it displays an arc shape. You can control the start and end angles of the arc, as well as if the angles are winding clockwise or anti-clockwise. With the default settings it renders as a complete circle. By changing the angles you can create other arc shapes, such as half-circles.
 *
 * Arcs also have an iterations property and corresponding setIterations method. This allows you to control how smooth the shape renders in WebGL, by controlling the number of iterations that take place during construction.
 */
export const Arc = createComponent(GameObjects.Arc);

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
export const BitmapText = createComponent(GameObjects.BitmapText);

/**
 * A Blitter Game Object.
 *
 * The Blitter Game Object is a special kind of container that creates, updates and manages Bob objects. Bobs are designed for rendering speed rather than flexibility. They consist of a texture, or frame from a texture, a position and an alpha value. You cannot scale or rotate them. They use a batched drawing method for speed during rendering.
 *
 * A Blitter Game Object has one texture bound to it. Bobs created by the Blitter can use any Frame from this Texture to render with, but they cannot use any other Texture. It is this single texture-bind that allows them their speed.
 *
 * If you have a need to blast a large volume of frames around the screen then Blitter objects are well worth investigating. They are especially useful for using as a base for your own special effects systems.
 */
export const Blitter = createComponent(GameObjects.Blitter);

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
export const Bob = createComponent(GameObjects.Bob) as FC<
  Props<GameObjects.Bob> & { frame: string | number }
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
export const Container = createComponent(GameObjects.Container);

/**
 * The Curve Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports both fill and stroke colors.
 *
 * To render a Curve Shape you must first create a Phaser.Curves.Curve object, then pass it to the Curve Shape in the constructor.
 *
 * The Curve shape also has a smoothness property and corresponding setSmoothness method. This allows you to control how smooth the shape renders in WebGL, by controlling the number of iterations that take place during construction. Increase and decrease the default value for smoother, or more jagged, shapes.
 */
export const Curve = createComponent(GameObjects.Curve);

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
export const DOMElement = createComponent(GameObjects.DOMElement);

/**
 * The Display List plugin.
 *
 * Display Lists belong to a Scene and maintain the list of Game Objects to render every frame.
 *
 * Some of these Game Objects may also be part of the Scene's Update List, for updating.
 */
export const DisplayList = createComponent(GameObjects.DisplayList);

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
export const DynamicBitmapText = createComponent(GameObjects.DynamicBitmapText);

/**
 * The Ellipse Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports both fill and stroke colors.
 *
 * When it renders it displays an ellipse shape. You can control the width and height of the ellipse. If the width and height match it will render as a circle. If the width is less than the height, it will look more like an egg shape.
 *
 * The Ellipse shape also has a smoothness property and corresponding setSmoothness method. This allows you to control how smooth the shape renders in WebGL, by controlling the number of iterations that take place during construction. Increase and decrease the default value for smoother, or more jagged, shapes.
 */
export const Ellipse = createComponent(GameObjects.Ellipse);

/**
 * An Extern Game Object is a special type of Game Object that allows you to pass rendering off to a 3rd party.
 *
 * When you create an Extern and place it in the display list of a Scene, the renderer will process the list as usual. When it finds an Extern it will flush the current batch, clear down the pipeline and prepare a transform matrix which your render function can take advantage of, if required.
 *
 * The WebGL context is then left is a 'clean' state, ready for you to bind your own shaders, or draw to it, whatever you wish to do. Once you've finished, you should free-up any of your resources. The Extern will then rebind the Phaser pipeline and carry on rendering the display list.
 *
 * Although this object has lots of properties such as Alpha, Blend Mode and Tint, none of them are used during rendering unless you take advantage of them in your own render code.
 */
export const Extern = createComponent(GameObjects.Extern);

/**
 * The base class that all Game Objects extend. You don't create GameObjects directly and they cannot be added to the display list. Instead, use them as the base for your own custom classes.
 */
export const GameObject = createComponent(GameObjects.GameObject);

/**
 * The Game Object Creator is a Scene plugin that allows you to quickly create many common types of Game Objects and return them using a configuration object, rather than having to specify a limited set of parameters such as with the GameObjectFactory.
 *
 * Game Objects made via this class are automatically added to the Scene and Update List unless you explicitly set the add property in the configuration object to false.
 */
export const GameObjectCreator = createComponent(GameObjects.GameObjectCreator);

/**
 * The Game Object Factory is a Scene plugin that allows you to quickly create many common types of Game Objects and have them automatically registered with the Scene.
 *
 * Game Objects directly register themselves with the Factory and inject their own creation methods into the class.
 */
export const GameObjectFactory = createComponent(GameObjects.GameObjectFactory);

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
export const Graphics = createComponent(GameObjects.Graphics);

/**
 * The Grid Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports only fill colors and cannot be stroked.
 *
 * A Grid Shape allows you to display a grid in your game, where you can control the size of the grid as well as the width and height of the grid cells. You can set a fill color for each grid cell as well as an alternate fill color. When the alternate fill color is set then the grid cells will alternate the fill colors as they render, creating a chess-board effect. You can also optionally have an outline fill color. If set, this draws lines between the grid cells in the given color. If you specify an outline color with an alpha of zero, then it will draw the cells spaced out, but without the lines between them.
 */
export const Grid = createComponent(GameObjects.Grid);

/**
 * A Group is a way for you to create, manipulate, or recycle similar Game Objects.
 *
 * Group membership is non-exclusive. A Game Object can belong to several groups, one group, or none.
 *
 * Groups themselves aren't displayable, and can't be positioned, rotated, scaled, or hidden.
 */
export const Group = createComponent(GameObjects.Group);

/**
 * An Image Game Object.
 *
 * An Image is a light-weight Game Object useful for the display of static images in your game, such as logos, backgrounds, scenery or other non-animated elements. Images can have input events and physics bodies, or be tweened, tinted or scrolled. The main difference between an Image and a Sprite is that you cannot animate an Image as they do not have the Animation component.
 */
export const Image = createComponent(GameObjects.Image) as FC<
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
export const IsoBox = createComponent(GameObjects.IsoBox);

/**
 * The IsoTriangle Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports only fill colors and cannot be stroked.
 *
 * An IsoTriangle is an 'isometric' triangle. Think of it like a pyramid. Each face has a different fill color. You can set the color of the top, left and right faces of the triangle respectively You can also choose which of the faces are rendered via the showTop, showLeft and showRight properties.
 *
 * You cannot view an IsoTriangle from under-neath, however you can change the 'angle' by setting the projection property. The reversed property controls if the IsoTriangle is rendered upside down or not.
 */
export const IsoTriangle = createComponent(GameObjects.IsoTriangle);

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
export const Layer = createComponent(GameObjects.Layer);

/**
 * A Scene plugin that provides a Phaser.GameObjects.LightsManager for the Light2D pipeline.
 */
export const Light = createComponent(GameObjects.Light) as FC<
  Props<GameObjects.Light> & {
    x: GameObjects.Light['x'];
    y: GameObjects.Light['y'];
    radius: GameObjects.Light['radius'];
    color: {
      r: GameObjects.Light['color']['r'];
      g: GameObjects.Light['color']['g'];
      b: GameObjects.Light['color']['b'];
    };
    intensity: GameObjects.Light['intensity'];
  }
>;

/**
 * Manages Lights for a Scene.
 *
 * Affects the rendering of Game Objects using the Light2D pipeline.
 */
export const LightsManager = createComponent(GameObjects.LightsManager);

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
export const LightsPlugin = createComponent(GameObjects.LightsPlugin);

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
export const Line = createComponent(GameObjects.Line);

/**
 * A Mesh2D game object renders a 2D mesh made from textured triangles.
 *
 * Connects bodies in the composite with constraints in a grid pattern, with optional cross braces.
 *
 * It only works in WebGL render mode.
 *
 * Mesh2D does not generate vertices from a texture frame. Each vertex provides its own position and texture coordinate.
 */
export const Mesh2D = createComponent(GameObjects.Mesh2D) as FC<
  Props<GameObjects.Mesh2D> & {
    texture: string | Phaser.Textures.Texture;
    vertices: number[];
    indices: number[];
    flipV?: boolean;
  }
>;

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
export const NineSlice = createComponent(GameObjects.NineSlice) as FC<
  Props<GameObjects.NineSlice> & {
    texture: string | Phaser.Textures.Texture;
    frame?: string | number;
  }
>;

/**
 * A particle emitter represents a single particle stream. It controls a pool of Particles and is controlled by a Particle Emitter Manager.
 */
export const ParticleEmitter = createComponent(
  GameObjects.Particles.ParticleEmitter,
);

/**
 * A PathFollower Game Object.
 *
 * A PathFollower is a Sprite Game Object with some extra helpers to allow it to follow a Path automatically.
 *
 * Anything you can do with a standard Sprite can be done with this PathFollower, such as animate it, tint it, scale it and so on.
 *
 * PathFollowers are bound to a single Path at any one time and can traverse the length of the Path, from start to finish, forwards or backwards, or from any given point on the Path to its end. They can optionally rotate to face the direction of the path, be offset from the path coordinates or rotate independently of the Path.
 */
export const PathFollower = createComponent(GameObjects.PathFollower) as FC<
  Props<GameObjects.PathFollower> & {
    path: GameObjects.PathFollower['path'];
    x: GameObjects.PathFollower['x'];
    y: GameObjects.PathFollower['y'];
    texture: string | Phaser.Textures.Texture;
    frame?: string | number;
  }
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
export const PointLight = createComponent(GameObjects.PointLight) as FC<
  Props<GameObjects.PointLight> & {
    x: GameObjects.PointLight['x'];
    y: GameObjects.PointLight['y'];
    color?: number;
  }
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
export const Polygon = createComponent(GameObjects.Polygon);

/**
 * The Rectangle Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports both fill and stroke colors.
 *
 * You can change the size of the rectangle by changing the `width` and `height` properties.
 */
export const Rectangle = createComponent(GameObjects.Rectangle);

/**
 * A Render Texture.
 *
 * A Render Texture is a special texture that allows any number of Game Objects to be drawn to it. You can take many complex objects and draw them all to this one texture, which can they be used as the texture for other Game Object's. It's a way to generate dynamic textures at run-time that are WebGL friendly and don't invoke expensive GPU uploads.
 *
 * Note that under WebGL a FrameBuffer, which is what the Render Texture uses internally, cannot be anti-aliased. This means that when drawing objects such as Shapes to a Render Texture they will appear to be drawn with no aliasing, however this is a technical limitation of WebGL. To get around it, create your shape as a texture in an art package, then draw that to the Render Texture.
 */
export const RenderTexture = createComponent(GameObjects.RenderTexture);

/**
 * A Rope Game Object.
 *
 * The Rope object is WebGL only and does not have a Canvas counterpart.
 *
 * A Rope is a special kind of Game Object that has a texture that repeats along its entire length. Unlike a Sprite, it isn't restricted to using just a quad and can have as many vertices as you define when creating it. The vertices can be arranged in a horizontal or vertical strip and have their own color and alpha values as well.
 *
 * A Ropes origin is always 0.5 x 0.5 and cannot be changed.
 */
export const Rope = createComponent(GameObjects.Rope) as FC<
  Props<Omit<GameObjects.Rope, 'points'>> & {
    texture?: string;
    frame?: string | number;
    points?: number | GameObjects.Rope['points'];
  }
>;

/**
 * A Shader Game Object.
 *
 * This Game Object allows you to easily add a quad with its own shader into the display list, and manipulate it as you would any other Game Object, including scaling, rotating, positioning and adding to Containers. The Shader can be made interactive and used for input events. It can also be used in filters to create visually stunning effects.
 *
 * It works by creating a custom RenderNode which runs a custom shader program to draw a quad. The shader program can be loaded from the Shader Cache, or provided in-line as strings.
 *
 * Please see the Phaser Examples GitHub repo for several examples of loading and creating shaders dynamically.
 *
 * Due to the way in which they work, you cannot directly change the alpha of a Shader. It should be handled via uniforms in the shader code itself.
 *
 * By default, a Shader has a uniform called `uProjectionMatrix` which is set automatically. You can control additional uniforms using the `setupUniforms` method in the Shader configuration object, which runs every time the shader renders.
 *
 * Shaders are stand-alone renders: they finish any current render batch and run once by themselves. As this costs a draw call, you should use them sparingly. If you need to have a fully batched custom shader, then please look at using a custom RenderNode instead. However, for background or special masking effects, they are extremely effective.
 *
 * Note: be careful when using texture coordinates in shader code. The built-in variable `gl_FragCoord` and the default uniform `outTexCoord` both use WebGL coordinates, which are `0,0` in the bottom-left. Additionally, `gl_FragCoord` says it's in "window relative" coordinates. But this is actually relative to the framebuffer size.
 */
export const Shader = createComponent(GameObjects.Shader) as FC<
  Props<GameObjects.Shader> & {
    shader: string;
  }
>;

/**
 * A Gradient Game Object.
 *
 * This Game Object is a quad which displays a gradient. You can manipulate this object like any other, make it interactive, and use it in filters and masks to create visually stunning effects.
 *
 * Behind the scenes, a Gradient is a `Phaser.GameObjects.Shader` using a specific shader program.
 *
 * The gradient color is determined by a `Phaser.Display.ColorRamp`, containing one or more `Phaser.Display.ColorBand` objects. The ramp is laid out along the `shape` of the gradient, originating from the `start` location. The `shapeMode` describes how the gradient fills elsewhere, e.g. a LINEAR gradient creates straight bands while a RADIAL gradient creates circles.
 *
 * Note that the shape of the gradient is fitted to a square. If its width and height are not equal, the shape will be distorted. This may be what you want.
 *
 * A Gradient can be animated by modifying its `offset` property, or by modifying the ramp data. If you modify ramp data, you may have to call `gradient.ramp.encode()` to rebuild it.
 */
export const Gradient = createComponent(GameObjects.Gradient) as FC<
  Props<GameObjects.Gradient> & {
    shader: string;
  }
>;

/**
 * A Noise Game Object.
 *
 * This game object is a quad which displays random noise. You can manipulate this object like any other, make it interactive, and use it in filters and masks to create visually stunning effects.
 *
 * Behind the scenes, a Noise is a `Phaser.GameObjects.Shader` using a specific shader program.
 *
 * Noise or 'white noise' is simply random values. These are created by hashing the offset pixel coordinates, so the same noise is always created at the same position. This creates a reproducible effect.
 *
 * You can set the color and transparency of the noise.
 *
 * You can scroll the noise by animating the `noiseOffset` property. Note that floating-point precision is very important to this effect. Scrolling very large distances may cause blockiness in the output. Scrolling very small distances may cause the output to change completely, as it is not processing the same exact values. If you scroll by an exact fraction of the resolution of the object, the output will remain mostly the same, but it is not guaranteed to be stable. It's more effective to use `setRenderToTexture` and use this as a texture in a `TileSprite`.
 *
 * You can set `noisePower` to sculpt the output levels. Higher power reduces higher values. Lower power reduces lower values.
 */
export const Noise = createComponent(GameObjects.Noise) as FC<
  Props<GameObjects.Noise> & {
    shader: string;
  }
>;

/**
 * A NoiseCell2D Game Object.
 *
 * This game object is a quad which displays cellular noise.
 * You can manipulate this object like any other, make it interactive,
 * and use it in filters and masks to create visually stunning effects.
 *
 * Behind the scenes, a NoiseCell2D is a {@link Phaser.GameObjects.Shader}
 * using a specific shader program.
 *
 * Cellular noise, also called Worley Noise or Voronoi Noise,
 * consists of a pattern of cells. This is good for modeling natural phenomena
 * like waves, clouds, or scales.
 *
 * You can set the color and transparency, cell count, variation,
 * and seed value of the noise.
 * You can change the detail level by increasing `noiseIterations`.
 * You can change the noise mode to output sharp edges, soft edges,
 * or flat colors for the cells.
 *
 * You can scroll the noise by animating the `noiseOffset` property.
 *
 * You can set `noiseNormalMap` to output a normal map.
 * This is a quick way to add texture for lighting.
 */
export const NoiseCell2D = createComponent(GameObjects.NoiseCell2D) as FC<
  Props<GameObjects.NoiseCell2D> & {
    shader: string;
  }
>;

/**
 * A NoiseCell3D Game Object.
 *
 * This game object is a quad which displays cellular noise.
 * You can manipulate this object like any other, make it interactive,
 * and use it in filters and masks to create visually stunning effects.
 *
 * Behind the scenes, a NoiseCell3D is a {@link Phaser.GameObjects.Shader}
 * using a specific shader program.
 *
 * Cellular noise, also called Worley Noise or Voronoi Noise,
 * consists of a pattern of cells. This is good for modeling natural phenomena
 * like waves, clouds, or scales.
 *
 * You can set the color and transparency, cell count, variation,
 * and seed value of the noise.
 * You can change the detail level by increasing `noiseIterations`.
 * You can change the noise mode to output sharp edges, soft edges,
 * or flat colors for the cells.
 *
 * You can scroll the noise by animating the `noiseOffset` property.
 *
 * You can set `noiseNormalMap` to output a normal map.
 * This is a quick way to add texture for lighting.
 *
 * The 3D version of NoiseCell has one extra dimension: Z.
 * The shader only renders the XY slice through the noise field.
 * Because the centers of cells typically lie elsewhere in the hypervolume,
 * cells appear with variation in brightness.
 * You can scroll on the Z axis to shift the slice, smoothly changing the cell pattern.
 */
export const NoiseCell3D = createComponent(GameObjects.NoiseCell3D) as FC<
  Props<GameObjects.NoiseCell3D> & {
    shader: string;
  }
>;

/**
 * A NoiseCell4D Game Object.
 *
 * This game object is a quad which displays cellular noise.
 * You can manipulate this object like any other, make it interactive,
 * and use it in filters and masks to create visually stunning effects.
 *
 * Behind the scenes, a NoiseCell4D is a {@link Phaser.GameObjects.Shader}
 * using a specific shader program.
 *
 * Cellular noise, also called Worley Noise or Voronoi Noise,
 * consists of a pattern of cells. This is good for modeling natural phenomena
 * like waves, clouds, or scales.
 *
 * You can set the color and transparency, cell count, variation,
 * and seed value of the noise.
 * You can change the detail level by increasing `noiseIterations`.
 * You can change the noise mode to output sharp edges, soft edges,
 * or flat colors for the cells.
 *
 * You can scroll the noise by animating the `noiseOffset` property.
 *
 * You can set `noiseNormalMap` to output a normal map.
 * This is a quick way to add texture for lighting.
 *
 * The 4D version of NoiseCell has two extra dimensions: Z and W.
 * The shader only renders the XY slice through the noise field.
 * Because the centers of cells typically lie elsewhere in the hypervolume,
 * cells appear with variation in brightness.
 * You can scroll on the Z axis to shift the slice, smoothly changing the cell pattern.
 * In 4D, you can instead move the ZW offset in a circle,
 * creating a constantly changing pattern which repeats without reversing
 * or resetting.
 * This ZW circling technique is advised for long-term effects,
 * because it avoids large offsets which can cause floating-point precision issues.
 */
export const NoiseCell4D = createComponent(GameObjects.NoiseCell4D) as FC<
  Props<GameObjects.NoiseCell4D> & {
    shader: string;
  }
>;

/**
 * A NoiseSimplex2D object.
 *
 * This game object is a quad which displays simplex noise.
 * You can manipulate this object like any other, make it interactive,
 * and use it in filters and masks to create visually stunning effects.
 *
 * Behind the scenes, a NoiseSimplex2D is a {@link Phaser.GameObjects.Shader}
 * using a specific shader program.
 *
 * Simplex noise is a smooth pattern ideal for soft, natural phenomena.
 * It is useful for clouds, flame, water, and many other effects.
 * Ken Perlin, the creator of Perlin Noise, created Simplex Noise
 * to improve performance and quality over the original.
 *
 * By default, the noise pattern is periodic: it repeats.
 * You can scroll in X and Y.
 * You can also change the `noiseFlow` value to evolve the pattern
 * along a periodic course.
 *
 * You can set the cell count, color and transparency of the pattern.
 * You can add fine detail with `noiseIterations`.
 * You can add turbulence with `noiseWarpAmount`.
 *
 * You can change the basic pattern with `noiseSeed`.
 * Different seeds create completely different patterns.
 *
 * You can set `noiseNormalMap` to output a normal map.
 * This is a quick way to add texture for lighting.
 *
 * For advanced users, you can configure the characteristics of octave iteration.
 * Use `noiseDetailPower`, `noiseFlowPower`, and `noiseContributionPower`
 * to adjust the exponential scaling rate of these values.
 * Use `noiseWarpDetailPower`, `noiseWarpFlowPower`, and
 * `noiseWarpContributionPower` to do the same for the warp effect.
 */
export const NoiseSimplex2D = createComponent(GameObjects.NoiseSimplex2D) as FC<
  Props<GameObjects.NoiseSimplex2D> & {
    shader: string;
  }
>;

/**
 * A NoiseSimplex3D object.
 *
 * This game object is a quad which displays simplex noise.
 * You can manipulate this object like any other, make it interactive,
 * and use it in filters and masks to create visually stunning effects.
 *
 * Behind the scenes, a NoiseSimplex3D is a {@link Phaser.GameObjects.Shader}
 * using a specific shader program.
 *
 * Simplex noise is a smooth pattern ideal for soft, natural phenomena.
 * It is useful for clouds, flame, water, and many other effects.
 * Ken Perlin, the creator of Perlin Noise, created Simplex Noise
 * to improve performance and quality over the original.
 *
 * By default, the noise pattern is periodic: it repeats.
 * You can scroll in X, Y, and Z.
 * You can also change the `noiseFlow` value to evolve the pattern
 * along a periodic course. This is useful to avoid scrolling into
 * regions of reduced floating-point precision with very large numbers.
 *
 * You can set the cell count, color and transparency of the pattern.
 * You can add fine detail with `noiseIterations`.
 * You can add turbulence with `noiseWarpAmount`.
 *
 * You can change the basic pattern with `noiseSeed`.
 * Different seeds create completely different patterns.
 * You must use integers for the seed, or bad things will happen.
 *
 * You can set `noiseNormalMap` to output a normal map.
 * This is a quick way to add texture for lighting.
 *
 * For advanced users, you can configure the characteristics of octave iteration.
 * Use `noiseDetailPower`, `noiseFlowPower`, and `noiseContributionPower`
 * to adjust the exponential scaling rate of these values.
 * Use `noiseWarpDetailPower`, `noiseWarpFlowPower`, and
 * `noiseWarpContributionPower` to do the same for the warp effect.
 */
export const NoiseSimplex3D = createComponent(GameObjects.NoiseSimplex3D) as FC<
  Props<GameObjects.NoiseSimplex3D> & {
    shader: string;
  }
>;

/**
 * The Shape Game Object is a base class for the various different shapes, such as the Arc, Star or Polygon. You cannot add a Shape directly to your Scene, it is meant as a base for your own custom Shape classes.
 */
export const Shape = createComponent(GameObjects.Shape);

/**
 * A SpriteGPULayer GameObject. This is a WebGL only GameObject.
 * It is optimized for rendering very large numbers of quads
 * following simple tween animations.
 * It is suited to complex backgrounds with animation.
 *
 * A SpriteGPULayer is a composite object that contains a collection of
 * Member objects. It stores the rendering data for these
 * objects in a GPU buffer, and renders them in a single draw call.
 * Because it only updates the GPU buffer when necessary,
 * it is up to 100 times faster than rendering the objects individually.
 * Avoid changing the contents of the SpriteGPULayer frequently, as this
 * requires the whole buffer to be updated.
 *
 * The layer can generally perform well with a million small quads.
 * The exact performance will depend on the device and the size of the quads.
 * If the quads are large, the layer will be fill-rate limited.
 * Avoid drawing more than a few million pixels per frame.
 *
 * Notes on textures:
 *
 * This layer gains much of its speed from inflexibility. It can only use one
 * texture, and that texture must be a single image.
 * It cannot use multi-atlas textures.
 *
 * Further, if the texture is not a power of two in size,
 * some texture seaming may occur if you line up sprites exactly.
 * This is because the GPU precision is limited by binary logic,
 * and texture coordinates will only be perfectly accurate for power of two textures.
 * This can be avoided by adding/extruding a pixel of padding around each frame
 * in the texture, or by using a power of two texture.
 */
export const SpriteGPULayer = createComponent(GameObjects.SpriteGPULayer) as FC<
  Props<GameObjects.SpriteGPULayer> & {
    texture: string | Phaser.Textures.Texture;
    frame?: string | number;
  }
>;

/**
 * A Stamp Game Object.
 *
 * A Stamp is a lightweight Game Object which ignores camera scroll and transform,
 * so it is always rendered at a fixed position on-screen regardless of where the
 * camera is looking. This makes it ideal for HUDs, score counters, overlays, and
 * other screen-space elements that should not move with the game world.
 *
 * Its primary role is as an internal helper for DynamicTexture rendering, where it
 * is used to draw (stamp) textures onto a DynamicTexture surface without the overhead
 * of a full scene Game Object lifecycle. It is otherwise functionally similar to
 * an Image Game Object.
 */
export const Stamp = createComponent(GameObjects.Stamp) as FC<
  Props<GameObjects.Stamp> & {
    texture: string | Phaser.Textures.Texture;
    frame?: string | number;
  }
>;

/**
 * A Stencil Game Object.
 *
 * A Stencil is a special type of Game Object used to place stencils over the canvas.
 * You can use it to efficiently control where subsequent objects are rendered.
 * It is WebGL-only.
 * Study the documentation carefully to understand how it works.
 *
 * A Stencil is an extended Container Game Object.
 * It contains a list of child Game Objects to render to the stencil buffer.
 * Think of these as opaque sheets of card held up over the canvas,
 * preventing anything from being drawn through them.
 *
 * The stencil buffer is provided by WebGL.
 * It is available if the game render config set `stencil` to `true`.
 * It is an 8-bit attachment to framebuffers, like an extra alpha channel.
 * But if the stencil channel is not 0 at a pixel, WebGL will skip rendering that pixel.
 * There are no degrees of transparency, only on or off.
 *
 * Stencil is best used for efficient, sharp-edged, reused masks.
 * You can draw a stencil once, and it will affect everything that is drawn later.
 * Its rendering cost is minimal: it is just the draw cost of its children.
 *
 * If you need better quality alpha handling, consider using a Mask filter instead.
 * Filters have a higher rendering cost, and apply to just 1 object at a time,
 * but they have the best quality.
 */
export const Stencil = createComponent(GameObjects.Stencil);

/**
 * A StencilReference Game Object.
 *
 * A StencilReference is a special type of Game Object that uses a Stencil
 * as a reference for its own rendering. This allows you to re-render a Stencil
 * using different settings.
 *
 * For example, you can add a layer with a Stencil with some complex geometry,
 * draw objects affected by the stencil layer,
 * then use a StencilReference to subtract the same layer without recreating it.
 *
 * It is WebGL-only.
 *
 * A StencilReference temporarily changes the settings on the target Stencil,
 * then restores them after rendering.
 * Thus, it keeps the original Stencil's transforms.
 * The stencil options can be changed by setting the properties on this object.
 * Note that these properties will be set to default values,
 * so if you have configured the targetStencil with its own properties,
 * you should configure this with those properties as well,
 * altered to your requirements.
 *
 * See the {@link Phaser.GameObjects.Stencil} documentation for more details.
 */
export const StencilReference = createComponent(GameObjects.StencilReference);

/**
 * A CaptureFrame is a special type of GameObject that allows you to
 * capture the current state of the render.
 * For example, if you place a CaptureFrame between two other objects,
 * it will capture the first object to a texture, but not the second.
 * This is useful for full-scene post-processing prior to render completion,
 * such as a layer of water.
 *
 * This is a WebGL only feature and is not available in Canvas mode.
 *
 * You must activate the `forceComposite` property of the Camera,
 * or otherwise use this object within a framebuffer, to use this feature.
 * Examples of framebuffer situations include Filters, DynamicTexture,
 * and a camera with alpha between 0 and 1.
 *
 * This object does not render anything. It simply captures a texture
 * from the current framebuffer at the moment it 'renders'.
 * If you add filters to this object, it will capture the clear, temporary
 * framebuffer used for the filter, not the main framebuffer.
 * If you add filters to a Container that contains this object,
 * it will capture only objects within that Container.
 * If you set `visible` to `false`, it will just stop capturing.
 */
export const CaptureFrame = createComponent(GameObjects.CaptureFrame);

/**
 * The Custom Context is a game object that allows you to modify the drawing context before it is used.
 *
 * The Custom Context is an extended Container Game Object.
 * Before game objects are rendered,
 * it clones the current DrawingContext and passes it to a callback.
 * You can configure this callback to set options on the DrawingContext.
 *
 * See the {@link Phaser.Renderer.WebGL.DrawingContext} documentation for more details
 * on DrawingContext settings.
 * This is an advanced rendering system and should be used carefully.
 * You should mostly only use the setter methods on the DrawingContext object.
 * Methods that don't begin with `set` are typically for internal use.
 *
 * If you modify the DrawingContext to create a new framebuffer,
 * it will not render to the canvas.
 * It is your responsibility to use the texture from the DrawingContext.
 * It is very inefficient to create a new framebuffer every frame,
 * though, so you should use a `DynamicTexture` with a retained framebuffer instead.
 */
export const CustomContext = createComponent(GameObjects.CustomContext);

/**
 * A Sprite Game Object.
 *
 * A Sprite Game Object is used for the display of both static and animated images in your game. Sprites can have input events and physics bodies. They can also be tweened, tinted, scrolled and animated.
 *
 * The main difference between a Sprite and an Image Game Object is that you cannot animate Images. As such, Sprites take a fraction longer to process and have a larger API footprint due to the Animation Component. If you do not require animation then you can safely use Images to replace Sprites in all cases.
 */
export const Sprite = createComponent(GameObjects.Sprite) as FC<
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
export const Star = createComponent(GameObjects.Star);

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
export const Text = createComponent(GameObjects.Text) as FC<
  Props<GameObjects.Text> & {
    style?: Phaser.Types.GameObjects.Text.TextStyle;
  }
>;

/**
 * A TextStyle class manages all of the style settings for a Text object.
 *
 * Text Game Objects create a TextStyle instance automatically, which is accessed via the Text.style property. You do not normally need to instantiate one yourself.
 */
export const TextStyle = createComponent(GameObjects.TextStyle);

/**
 * A TileSprite is a Sprite that has a repeating texture.
 *
 * The texture can be scrolled and scaled independently of the TileSprite itself. Textures will automatically wrap and are designed so that you can create game backdrops using seamless textures as a source.
 *
 * You shouldn't ever create a TileSprite any larger than your actual canvas size. If you want to create a large repeating background that scrolls across the whole map of your game, then you create a TileSprite that fits the canvas size and then use the tilePosition property to scroll the texture as the player moves. If you create a TileSprite that is thousands of pixels in size then it will consume huge amounts of memory and cause performance issues. Remember: use tilePosition to scroll your texture and tileScale to adjust the scale of the texture - don't resize the sprite itself or make it larger than it needs.
 *
 * An important note about Tile Sprites and NPOT textures: Internally, TileSprite textures use GL_REPEAT to provide seamless repeating of the textures. This, combined with the way in which the textures are handled in WebGL, means they need to be POT (power-of-two) sizes in order to wrap. If you provide a NPOT (non power-of-two) texture to a TileSprite it will generate a POT sized canvas and draw your texture to it, scaled up to the POT size. It's then scaled back down again during rendering to the original dimensions. While this works, in that it allows you to use any size texture for a Tile Sprite, it does mean that NPOT textures are going to appear anti-aliased when rendered, due to the interpolation that took place when it was resized into a POT texture. This is especially visible in pixel art graphics. If you notice it and it becomes an issue, the only way to avoid it is to ensure that you provide POT textures for Tile Sprites.
 */
export const TileSprite = createComponent(GameObjects.TileSprite) as FC<
  Props<GameObjects.TileSprite> & {
    x: GameObjects.TileSprite['x'];
    y: GameObjects.TileSprite['y'];
    width: GameObjects.TileSprite['width'];
    height: GameObjects.TileSprite['height'];
    texture: string;
    frame?: string | number;
  }
>;

/**
 * The Triangle Shape is a Game Object that can be added to a Scene, Group or Container. You can treat it like any other Game Object in your game, such as tweening it, scaling it, or enabling it for input or physics. It provides a quick and easy way for you to render this shape in your game without using a texture, while still taking advantage of being fully batched in WebGL.
 *
 * This shape supports both fill and stroke colors.
 *
 * The Triangle consists of 3 lines, joining up to form a triangular shape. You can control the position of each point of these lines. The triangle is always closed and cannot have an open face. If you require that, consider using a Polygon instead.
 */
export const Triangle = createComponent(GameObjects.Triangle);

/**
 * The Update List plugin.
 *
 * Update Lists belong to a Scene and maintain the list Game Objects to be updated every frame.
 *
 * Some or all of these Game Objects may also be part of the Scene's Display List, for Rendering.
 */
export const UpdateList = createComponent(GameObjects.UpdateList);

/**
 * A Video Game Object.
 *
 * This Game Object is capable of handling playback of a previously loaded video from the Phaser Video Cache, or playing a video based on a given URL. Videos can be either local, or streamed.
 */
export const Video = createComponent(GameObjects.Video) as FC<
  Props<GameObjects.Video> & {
    x: GameObjects.Video['x'];
    y: GameObjects.Video['y'];
  }
>;

/**
 * A Zone Game Object.
 *
 * A Zone is a non-rendering rectangular Game Object that has a position and size. It has no texture and never displays, but does live on the display list and can be moved, scaled and rotated like any other Game Object.
 *
 * Its primary use is for creating Drop Zones and Input Hit Areas and it has a couple of helper methods specifically for this. It is also useful for object overlap checks, or as a base for your own non-displaying Game Objects. The default origin is 0.5, the center of the Zone, the same as with Game Objects.
 */
export const Zone = createComponent(GameObjects.Zone) as FC<
  Props<GameObjects.Zone> & {
    x: GameObjects.Zone['x'];
    y: GameObjects.Zone['y'];
  }
>;
