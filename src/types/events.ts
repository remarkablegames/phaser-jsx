import type { EventData, GameObject, Pointer } from './phaser';

export interface Events {
  /**
   * The Input Plugin Boot Event.
   *
   * This internal event is dispatched by the Input Plugin when it boots, signalling to all of its systems to create themselves.
   */
  onBoot: () => void;

  /**
   * The Input Plugin Destroy Event.
   *
   * This internal event is dispatched by the Input Plugin when it is destroyed, signalling to all of its systems to destroy themselves.
   */
  onDestroy: () => void;

  /**
   * The Pointer Drag End Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer stops dragging a Game Object.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The interactive Game Object that this pointer stopped dragging.
   */
  onDragEnd: (pointer: Pointer, gameObject: GameObject) => void;

  /**
   * The Pointer Drag Enter Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer drags a Game Object into a Drag Target.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The interactive Game Object that this pointer is dragging.
   * @param target - The drag target that this pointer has moved into.
   */
  onDragEnter: (
    pointer: Pointer,
    gameObject: GameObject,
    target: GameObject,
  ) => void;

  /**
   * The Pointer Drag Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer moves while dragging a Game Object.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The interactive Game Object that this pointer is dragging.
   * @param dragX - The x coordinate where the Pointer is currently dragging the Game Object, in world space.
   * @param dragY - The y coordinate where the Pointer is currently dragging the Game Object, in world space.
   */
  onDrag: (
    pointer: Pointer,
    gameObject: GameObject,
    dragX: number,
    dragY: number,
  ) => void;

  /**
   * The Pointer Drag Leave Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer drags a Game Object out of a Drag Target.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The interactive Game Object that this pointer is dragging.
   * @param target - The drag target that this pointer has left.
   */
  onDragLeave: (
    pointer: Pointer,
    gameObject: GameObject,
    target: GameObject,
  ) => void;

  /**
   * The Pointer Drag Over Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer drags a Game Object over a Drag Target.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The interactive Game Object that this pointer is dragging.
   * @param target - The drag target that this pointer has moved over.
   */
  onDragOver: (
    pointer: Pointer,
    gameObject: GameObject,
    target: GameObject,
  ) => void;

  /**
   * The Pointer Drag Start Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer starts to drag any Game Object.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The interactive Game Object that this pointer is dragging.
   */
  onDragStart: (pointer: Pointer, gameObject: GameObject) => void;

  /**
   * The Pointer Drop Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer drops a Game Object on a Drag Target.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The interactive Game Object that this pointer was dragging.
   * @param target - The Drag Target the `gameObject` has been dropped on.
   */
  onDrop: (
    pointer: Pointer,
    gameObject: GameObject,
    target: GameObject,
  ) => void;

  /**
   * The Game Object Down Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer is pressed down on any interactive Game Object.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The Game Object the pointer was pressed down on.
   * @param event - The Phaser input event. You can call `stopPropagation()` to halt it from going any further in the event flow.
   */
  onGameObjectDown: (
    pointer: Pointer,
    gameObject: GameObject,
    event: EventData,
  ) => void;

  /**
   * The Game Object Drag End Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer stops dragging it.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param dragX - The x coordinate where the Pointer stopped dragging the Game Object, in world space.
   * @param dragY - The y coordinate where the Pointer stopped dragging the Game Object, in world space.
   */
  onGameObjectDragEnd: (pointer: Pointer, dragX: number, dragY: number) => void;

  /**
   * The Game Object Drag Enter Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer drags it into a drag target.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param target - The drag target that this pointer has moved into.
   */
  onGameObjectDragEnter: (pointer: Pointer, target: GameObject) => void;

  /**
   * The Game Object Drag Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer moves while dragging it.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param dragX - The x coordinate where the Pointer is currently dragging the Game Object, in world space.
   * @param dragY - The y coordinate where the Pointer is currently dragging the Game Object, in world space.
   */
  onGameObjectDrag: (pointer: Pointer, dragX: number, dragY: number) => void;

  /**
   * The Game Object Drag Leave Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer drags it out of a drag target.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param target - The drag target that this pointer has left.
   */
  onGameObjectDragLeave: (pointer: Pointer, target: GameObject) => void;

  /**
   * The Game Object Drag Over Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer drags it over a drag target.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param target - The drag target that this pointer has moved over.
   */
  onGameObjectDragOver: (pointer: Pointer, target: GameObject) => void;

  /**
   * The Game Object Drag Start Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer starts to drag it.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param dragX - The x coordinate where the Pointer is currently dragging the Game Object, in world space.
   * @param dragY - The y coordinate where the Pointer is currently dragging the Game Object, in world space.
   */
  onGameObjectDragStart: (
    pointer: Pointer,
    dragX: number,
    dragY: number,
  ) => void;

  /**
   * The Game Object Drop Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer drops it on a Drag Target.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param target - The Drag Target the `gameObject` has been dropped on.
   */
  onGameObjectDrop: (pointer: Pointer, target: GameObject) => void;

  /**
   * The Game Object Move Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer is moved across any interactive Game Object.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The Game Object the pointer was moved on.
   * @param event - The Phaser input event. You can call `stopPropagation()` to halt it from going any further in the event flow.
   */
  onGameObjectMove: (
    pointer: Pointer,
    gameObject: GameObject,
    event: EventData,
  ) => void;

  /**
   * The Game Object Out Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer moves out of any interactive Game Object.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The Game Object the pointer moved out of.
   * @param event - The Phaser input event. You can call `stopPropagation()` to halt it from going any further in the event flow.
   */
  onGameObjectOut: (
    pointer: Pointer,
    gameObject: GameObject,
    event: EventData,
  ) => void;

  /**
   * The Game Object Over Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer moves over any interactive Game Object.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The Game Object the pointer moved over.
   * @param event - The Phaser input event. You can call `stopPropagation()` to halt it from going any further in the event flow.
   */
  onGameObjectOver: (
    pointer: Pointer,
    gameObject: GameObject,
    event: EventData,
  ) => void;

  /**
   * The Game Object Pointer Down Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer is pressed down on it.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param localX - The x coordinate that the Pointer interacted with this object on, relative to the Game Object's top-left position.
   * @param localY - The y coordinate that the Pointer interacted with this object on, relative to the Game Object's top-left position.
   * @param event - The Phaser input event. You can call `stopPropagation()` to halt it from going any further in the event flow.
   */
  onGameObjectPointerDown: (
    pointer: Pointer,
    localX: number,
    localY: number,
    event: EventData,
  ) => void;

  /**
   * The Game Object Pointer Move Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer is moved while over it.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param localX - The x coordinate that the Pointer interacted with this object on, relative to the Game Object's top-left position.
   * @param localY - The y coordinate that the Pointer interacted with this object on, relative to the Game Object's top-left position.
   * @param event - The Phaser input event. You can call `stopPropagation()` to halt it from going any further in the event flow.
   */
  onGameObjectPointerMove: (
    pointer: Pointer,
    localX: number,
    localY: number,
    event: EventData,
  ) => void;

  /**
   * The Game Object Pointer Out Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer moves out of it.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param event - The Phaser input event. You can call `stopPropagation()` to halt it from going any further in the event flow.
   */
  onGameObjectPointerOut: (pointer: Pointer, event: EventData) => void;

  /**
   * The Game Object Pointer Over Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer moves over it.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param localX - The x coordinate that the Pointer interacted with this object on, relative to the Game Object's top-left position.
   * @param localY - The y coordinate that the Pointer interacted with this object on, relative to the Game Object's top-left position.
   * @param event - The Phaser input event. You can call `stopPropagation()` to halt it from going any further in the event flow.
   */
  onGameObjectPointerOver: (
    pointer: Pointer,
    localX: number,
    localY: number,
    event: EventData,
  ) => void;

  /**
   * The Game Object Pointer Up Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer is released while over it.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param localX - The x coordinate that the Pointer interacted with this object on, relative to the Game Object's top-left position.
   * @param localY - The y coordinate that the Pointer interacted with this object on, relative to the Game Object's top-left position.
   * @param event - The Phaser input event. You can call `stopPropagation()` to halt it from going any further in the event flow.
   */
  onGameObjectPointerUp: (
    pointer: Pointer,
    localX: number,
    localY: number,
    event: EventData,
  ) => void;

  /**
   * The Game Object Pointer Wheel Event.
   *
   * This event is dispatched by an interactive Game Object if a pointer has its wheel moved while over it.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param deltaX - The horizontal scroll amount that occurred due to the user moving a mouse wheel or similar input device.
   * @param deltaY - The vertical scroll amount that occurred due to the user moving a mouse wheel or similar input device. This value will typically be less than 0 if the user scrolls up and greater than zero if scrolling down.
   * @param deltaZ - The z-axis scroll amount that occurred due to the user moving a mouse wheel or similar input device.
   * @param event - The Phaser input event. You can call `stopPropagation()` to halt it from going any further in the event flow.
   */
  onGameObjectPointerWheel: (
    pointer: Pointer,
    deltaX: number,
    deltaY: number,
    deltaZ: number,
    event: EventData,
  ) => void;

  /**
   * The Game Object Up Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer is released while over any interactive Game Object.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The Game Object the pointer was over when released.
   * @param event - The Phaser input event. You can call `stopPropagation()` to halt it from going any further in the event flow.
   */
  onGameObjectUp: (
    pointer: Pointer,
    gameObject: GameObject,
    event: EventData,
  ) => void;

  /**
   * The Game Object Wheel Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer has its wheel moved while over any interactive Game Object.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param gameObject - The Game Object the pointer was over when the wheel changed.
   * @param deltaX - The horizontal scroll amount that occurred due to the user moving a mouse wheel or similar input device.
   * @param deltaY - The vertical scroll amount that occurred due to the user moving a mouse wheel or similar input device. This value will typically be less than 0 if the user scrolls up and greater than zero if scrolling down.
   * @param deltaZ - The z-axis scroll amount that occurred due to the user moving a mouse wheel or similar input device.
   * @param event - The Phaser input event. You can call `stopPropagation()` to halt it from going any further in the event flow.
   */
  onGameObjectWheel: (
    pointer: Pointer,
    gameObject: GameObject,
    deltaX: number,
    deltaY: number,
    deltaZ: number,
    event: EventData,
  ) => void;

  /**
   * The Input Plugin Game Out Event.
   *
   * This event is dispatched by the Input Plugin if the active pointer leaves the game canvas and is now outside of it, elsewhere on the web page.
   *
   * @param time - The current time. Either a High Resolution Timer value if it comes from Request Animation Frame, or Date.now if using SetTimeout.
   * @param event - The DOM Event that triggered the canvas out.
   */
  onGameOut: (time: number, event: MouseEvent | TouchEvent) => void;

  /**
   * The Input Plugin Game Over Event.
   *
   * This event is dispatched by the Input Plugin if the active pointer enters the game canvas and is now over of it, having previously been elsewhere on the web page.
   *
   * @param time - The current time. Either a High Resolution Timer value if it comes from Request Animation Frame, or Date.now if using SetTimeout.
   * @param event - The DOM Event that triggered the canvas out.
   */
  onGameOver: (time: number, event: MouseEvent | TouchEvent) => void;

  /**
   * The Input Manager Boot Event.
   *
   * This internal event is dispatched by the Input Manager when it boots.
   */
  onManagerBoot: () => void;

  /**
   * The Input Manager Process Event.
   *
   * This internal event is dispatched by the Input Manager when not using the legacy queue system, and it wants the Input Plugins to update themselves.
   *
   * @param time - The current time. Either a High Resolution Timer value if it comes from Request Animation Frame, or Date.now if using SetTimeout.
   * @param delta - The delta time in ms since the last frame. This is a smoothed and capped value based on the FPS rate.
   */
  onManagerProcess: (time: number, delta: number) => void;

  /**
   * The Input Manager Update Event.
   *
   * This internal event is dispatched by the Input Manager as part of its update step.
   */
  onManagerUpdate: () => void;

  /**
   * The Input Manager Pointer Lock Change Event.
   *
   * This event is dispatched by the Input Manager when it is processing a native Pointer Lock Change DOM Event.
   *
   * @param event - The native DOM Event.
   * @param locked - The locked state of the Mouse Pointer.
   */
  onPointerLockChange: (event: Event, locked: boolean) => void;

  /**
   * The Pointer Down Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer is pressed down anywhere.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param currentlyOver - An array containing all interactive Game Objects that the pointer was over when the event was created.
   */
  onPointerDown: (pointer: Pointer, currentlyOver: GameObject[]) => void;

  /**
   * The Pointer Down Outside Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer is pressed down anywhere outside of the game canvas.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   */
  onPointerDownOutside: (pointer: Pointer) => void;

  /**
   * The Pointer Move Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer is moved anywhere.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param currentlyOver - An array containing all interactive Game Objects that the pointer was over when the event was created.
   */
  onPointerMove: (pointer: Pointer, currentlyOver: GameObject[]) => void;

  /**
   * The Pointer Out Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer moves out of any interactive Game Object.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param justOut - An array containing all interactive Game Objects that the pointer moved out of when the event was created.
   */
  onPointerOut: (pointer: Pointer, justOut: GameObject[]) => void;

  /**
   * The Pointer Over Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer moves over any interactive Game Object.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param justOver - An array containing all interactive Game Objects that the pointer moved over when the event was created.
   */
  onPointerOver: (pointer: Pointer, justOver: GameObject[]) => void;

  /**
   * The Pointer Up Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer is released anywhere.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param currentlyOver - An array containing all interactive Game Objects that the pointer was over when the event was created.
   */
  onPointerUp: (pointer: Pointer, currentlyOver: GameObject[]) => void;

  /**
   * The Pointer Up Outside Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer is released anywhere outside of the game canvas.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   */
  onPointerUpOutside: (pointer: Pointer) => void;

  /**
   * The Pointer Wheel Input Event.
   *
   * This event is dispatched by the Input Plugin belonging to a Scene if a pointer has its wheel updated.
   *
   * @param pointer - The Pointer responsible for triggering this event.
   * @param currentlyOver - An array containing all interactive Game Objects that the pointer was over when the event was created.
   * @param deltaX - The horizontal scroll amount that occurred due to the user moving a mouse wheel or similar input device.
   * @param deltaY - The vertical scroll amount that occurred due to the user moving a mouse wheel or similar input device. This value will typically be less than 0 if the user scrolls up and greater than zero if scrolling down.
   * @param deltaZ - The z-axis scroll amount that occurred due to the user moving a mouse wheel or similar input device.
   */
  onPointerWheel: (
    pointer: Pointer,
    currentlyOver: GameObject[],
    deltaX: number,
    deltaY: number,
    deltaZ: number,
  ) => void;

  /**
   * The Input Plugin Pre-Update Event.
   *
   * This internal event is dispatched by the Input Plugin at the start of its `preUpdate` method. This hook is designed specifically for input plugins, but can also be listened to from user-land code.
   */
  onPreUpdate: () => void;

  /**
   * The Input Plugin Shutdown Event.
   *
   * This internal event is dispatched by the Input Plugin when it shuts down, signalling to all of its systems to shut themselves down.
   */
  onShutdown: () => void;

  /**
   * The Input Plugin Start Event.
   *
   * This internal event is dispatched by the Input Plugin when it has finished setting-up, signalling to all of its internal systems to start.
   */
  onStart: () => void;

  /**
   * The Input Plugin Update Event.
   *
   * This internal event is dispatched by the Input Plugin at the start of its `update` method. This hook is designed specifically for input plugins, but can also be listened to from user-land code.
   *
   * @param time - The current time. Either a High Resolution Timer value if it comes from Request Animation Frame, or Date.now if using SetTimeout.
   * @param delta - The delta time in ms since the last frame. This is a smoothed and capped value based on the FPS rate.
   */
  onUpdate: (time: number, delta: number) => void;
}
