AdslJumper.utils = {};

// создаёт в группе group объект из тайла
// return void (undefined)
AdslJumper.utils.createFromTileObject = function (element, group) {
    // создадим элемент в группе в позиции {x; y} со спрайтов из элемента
    var sprite = group.create(element.x, element.y, element.properties.sprite);

    // copy all properties
    Object.keys(element.properties).forEach(function (key) {
        sprite[key] = element.properties[key];
    });

    // play animation
    if (sprite.animated) {
        sprite.animations.add("default");
        sprite.animations.play("default", 10, true);
    }
};


// Ищет объекты карты в указанном слоё
// return array of objects
AdslJumper.utils.findObjectsByType = function (type, map, layer) {
    var result = [];
    // tilemap.objects возвращает массив слоёв
    map.objects[layer].forEach(function (element) {
        if (element.type === type) {
            // в Phaser anchor верхний левый угол, а в Tiled левый нижний угол
            element.y -= map.tileHeight;
            result.push(element);
        }
    });

    return result;
};
