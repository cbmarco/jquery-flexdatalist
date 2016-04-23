/**
 * jQuery FlexDatalist.
 * Autocomplete alike to input fields.
 *
 * Depends:
 * jquery.js 1.7+
 *
 * Documentation:
 * http://projects.sergiodinislopes.pt/jquery.flexdatalist/
 *
 * Demo:
 * http://projects.sergiodinislopes.pt/jquery.flexdatalist/example/
 *
 * Github:
 * https://github.com/sergiodlopes/jquery.flexdatalist/
 */
(function($) {
    $.fn.flexdatalist = function(options) {
        var $document = $(document),
            _this = this;
        if (!$document.data('flexdatalist')) {
            // Remove items on click outside
            $(document).mouseup(function (event) {
                var $container = $('.flexdatalist-results');
                if (!$container.is(event.target) && $container.has(event.target).length === 0) {
                    $container.remove();
                }
            // Keyboard navigation
            }).keydown(function (event) {
                var $ul = $('.flexdatalist-results'),
                    $li = $ul.find('li'),
                    $active = $li.filter('.active'),
                    index = $active.index(),
                    length = $li.length,
                    keynum = event.keyCode || event.which;

                if (length === 0) {
                    return;
                }

                // Enter key
                if (keynum === 13) {
                    event.preventDefault();
                    $active.click();
                // Up/Down key
                } else if (keynum === 40 || keynum === 38) {
                    event.preventDefault();
                    // Down key
                    if (keynum === 40) {
                        if (index < length && $active.nextAll('.item').first().length > 0) {
                            $active = $active.removeClass('active').nextAll('.item').first().addClass('active');
                        } else {
                            $active = $li.removeClass('active').filter('.item:first').addClass('active');
                        }
                    // Up key
                    } else if (keynum === 38) {
                        if (index > 0 && $active.prevAll('.item').first().length > 0) {
                            $active = $active.removeClass('active').prevAll('.item').first().addClass('active');
                        } else {
                            $active = $li.removeClass('active').filter('.item:last').addClass('active');
                        }
                    }
                    _this._scrollTo($ul, $active);
                }
            }).data('flexdatalist', true);
        }

        this._scrollTo = function ($ul, $active) {
            var position = ($active.prev().length === 0 ? $active : $active.prev()).position().top;
            $ul.animate({
                scrollTop: position + $ul.scrollTop()
            }, 100);
        }

        return this.each(function() {
            var $this = $(this),
                _cache = {},
                _inputName = $this.attr('name');

            if ($this.hasClass('flexdatalist-set')) {
                return;
            }

            var options = $.extend({
                url: null,
                data: [],
                file: null,
                cache: true,
                searchContain: false,
                minLength: 2,
                mergeRemoteData: false,
                groupBy: false,
                selectionRequired: false,
                focusFirstResult: false,
                textProperty: null,
                valueProperty: null,
                visibleProperties: [],
                searchIn: ['label']
            }, options, $this.data());

            options.searchIn = typeof options.searchIn === 'string' ? options.searchIn.split(',') : options.searchIn;
            options.visibleProperties = options.visibleProperties.length === 0 ? options.searchIn : options.visibleProperties;
            options.multiple = $this.attr('multiple');

            // Handle multiple values
            if (options.multiple) {
<<<<<<< HEAD
=======
                _inputName += '[]';
>>>>>>> 0c63a0643a111bfd5285c40f2aef208324cb2215
                var $ulMultiple = $('<ul>')
                    .addClass('flexdatalist-multiple')
                    .css({
                        'background-color': $this.css("background-color"),
                        'border-color': $this.css("border-left-color"),
                        'border-width': $this.css("border-left-width"),
                        'border-style': $this.css("border-left-style"),
                        'border-radius': $this.css("border-top-left-radius")
                    })
                    .insertAfter($this);
                $_this = $this.clone(true).attr('name', null);
                $this.remove();
                $this = $_this;
                var $li = $('<li class="input-container">')
                    .addClass('flexdatalist-multiple-value')
                    .append($this)
                    .appendTo($ulMultiple);
            }

        /**
         * Initialize.
         */
            $this.init = function () {
                // Set datalist data
                $this.datalist();
                // Listen to parent input key presses and state events.
                $this.on('input keyup', function (event) {
                    var val = $this.keyword();
                    if ($this._ignoreKey(event)) {
                        return;
                    }
                    if (val.length >= options.minLength) {
                        $this.search();
                    } else {
                        $this.removeResults();
                    }
                    if (!options.multiple) {
                        if (!options.selectionRequired) {
                            $this.value(val);
                        } else if ($this.hiddenInput().length > 0 && !$this.selected()) {
                            $this.value('');
                        }
                    }
                }).on('input keydown', function (event) {
                    if ($this._keyNum(event) === 188 && !options.selectionRequired && options.multiple) {
                        event.preventDefault();
                        $this.value($this.keyword());
                    }
                }).blur(function () {
                    if (options.selectionRequired && !$this.selected()) {
                        $this.value('');
                    }
                })
                .attr('autocomplete', 'off')
                .addClass('flexdatalist-set')
                .trigger('init:flexdatalist', [options]);
<<<<<<< HEAD

=======
                
>>>>>>> 0c63a0643a111bfd5285c40f2aef208324cb2215
                window.onresize = function(event) {
                    $this.position();
                };
            }

        /**
<<<<<<< HEAD
         * Set value on load.
         */
            $this._setValue = function () {
                var value = $this.attr('value');
                if (value === '') {
                    return;
                }

                if (options.valueProperty === '*' || typeof options.valueProperty === 'object') {
                    var value = $this._parseValue(value);
                    if (typeof value === 'object' && Object.keys(value).length > 0) {
                        if (options.multiple) {
                            $.each(value, function (i, _value) {
                                $this.value(_value);
                            });
                        } else {
                            $this.value(value);
                        }
=======
         * Keyboard key code.
         */
            $this._setValue = function () {
                var value = $this.keyword();
                if (value === '') {
                    return;
                }
                if (options.multiple || options.valueProperty === '*') {
                    var value = $this._parseValue(value);
                    console.log(value);
                    if (typeof value === 'object') {
                        $this.value(value);
>>>>>>> 0c63a0643a111bfd5285c40f2aef208324cb2215
                    } else {
                        $this.val('');
                    }
                } else {
                    $this.value(value);
                }
            }

        /**
         * Keyboard key code.
         */
            $this._parseValue = function (data) {
                if (typeof data === 'string') {
                    try {
                        return JSON.parse(data);
                    } catch (e) {
                        return data;
                    }
                }
                return data;
            }

        /**
         * Position results below parent element.
         */
            $this._keyNum = function (event) {
                return event.which || event.keyCode;
            }

        /**
         * Position results below parent element.
         */
            $this._ignoreKey = function (event) {
                var keynum = $this._keyNum(event);
                return keynum === 0 || keynum === 13 || keynum === 38 || keynum === 40;
            }

        /**
         * Position results below parent element.
         */
            $this.search = function () {
                $this._data(function (data) {
                    var results = [],
                        keyword = $this.keyword();
                    // Merge remote data with data set on init.
                    if (options.mergeRemoteData) {
                        data = $.extends(options.data, data);
                    }

                    var groupProperty = options.groupBy;
                    for (var index = 0; index < data.length; index++) {
                        var _data = $this.matches(data[index], keyword);
                        if (!_data) {
                            continue;
                        }
                        if (groupProperty) {
                            if (typeof _data[groupProperty] !== 'undefined') {
                                var propertyValue = _data[groupProperty];
                                if (typeof results[propertyValue] === 'undefined') {
                                    results[propertyValue] = [];
                                }
                                results[propertyValue].push(_data);
                            }
                        } else {
                            results.push(_data);
                        }
                    }
                    $this.results(results);
                });
            }

        /**
         * Match against searchable properties.
         */
<<<<<<< HEAD
            $this.matches = function (data, keyword) {
=======
            $this.match = function (data, keyword) {
>>>>>>> 0c63a0643a111bfd5285c40f2aef208324cb2215
                var matches = false;
                for (var si = 0; si < options.searchIn.length; si++) {
                    var searchProperty = options.searchIn[si];
                    if (typeof data[searchProperty] === 'undefined') {
                        continue;
                    }
                    var propertyValue = data[searchProperty];
                    if ($this.find(propertyValue, keyword)) {
                        data[searchProperty + '_highlight'] = $this.highlight(propertyValue, keyword);
                        matches = true;
                    }
                }
                return matches ? data : null;
            }

        /**
         * Wrap found keyword with span.highlight
         */
            $this.highlight = function (text, keyword) {
                return text.replace(
                    new RegExp(keyword, (options.searchContain ? "ig" : "i")),
                    '<span class="highlight">$&</span>'
                );
            }

        /**
         * Search for keyword in string.
         */
            $this.find = function (text, keyword) {
                text = $this.normalizeString(text),
                keyword = $this.normalizeString(keyword);
                return (options.searchContain ? (text.indexOf(keyword) >= 0) : (text.indexOf(keyword) === 0));
            }

        /**
         * Get data.
         */
            $this._data = function (callback) {
                if (options.data.length > 0) {
                    callback(options.data);
                    return;
                } else if (!options.url && !options.file) {
                    return;
                }

                var keyword = $this.keyword(),
                    url = options.url ? options.url : options.file,
                    keywordTruncated = keyword.substring(0, options.minLength),
                    cachedData = $this.cache(keywordTruncated);

                // Check cache
                if (cachedData) {
                    callback(cachedData);
                    return;
                }

                if ($this.hasClass('flexdatalist-loading')) {
                    return;
                }
                $this.addClass('flexdatalist-loading');

                $.ajax({
                    url: url,
                    data: {keyword: keywordTruncated, contain: options.searchContain},
                    type: 'post',
                    dataType: 'json',
                    success: function (data) {
                        $this.removeClass('flexdatalist-loading');
                        var _data = data.results ? data.results : data;
                        if (typeof _data === 'string' && _data.indexOf('[{') === 0) {
                            _data = JSON.parse(_data);
                        }
                        if (typeof _data === 'object') {
                            callback(_data);
                            if (options.url) {
                                $this.cache(keywordTruncated, _data);
                            } else if (options.file) {
                                options.data = data;
                            }
                        }
                    }
                });
            }

        /**
         * Set datalist data, if exists.
         */
            $this.datalist = function () {
                var list = $this.attr('list');
                if (list) {
                    $this.attr('list', null);
                    $('#' + list).find('option').each(function() {
                        var val = $(this).val();
                        options.data.push({
                            label: val,
                            value: val
                        });
                    });
                }
                return $this;
            }

        /**
         * Cached data.
         */
            $this.cache = function (key, data) {
                if (options.cache) {
                    key = $this.normalizeString(key);
                    if (typeof data === 'undefined') {
                        if (typeof _cache[key] !== 'undefined') {
                            data = _cache[key];
                        }
                        return data;
                    }
                    _cache[key] = data;
                }
                return null;
            }

        /**
         * Show results.
         */
            $this.results = function (data) {
                $this.removeResults();

                if (data.length === 0 && Object.keys(data).length === 0) {
                    return;
                }

                var $ul = $this.getContainer();
                if ($this.selected()) {
                    $this.selected(false).value('');
                }
                if (!options.groupBy) {
                    $this.items(data, $ul);
                } else {
                    Object.keys(data).forEach(function (groupName, index) {
                        var items = data[groupName],
                            property = options.groupBy,
                            groupText = $this.getHighlight(items[0], property, groupName);

                        var $li = $('<li>')
                                .addClass('group')
                                .append($('<span>')
                                    .addClass('group-name')
                                    .html(groupText)
                                )
                                .append($('<span>')
                                    .addClass('group-item-count')
                                    .text(' ' + items.length)
                                )
                                .appendTo($ul);

                        $this.items(items, $ul);
                    });
                }

                var $li = $ul.find('li:not(.group)');
                $li.on('click', function (event) {
                    var item = $(this).data('item');
                    if (item) {
                        $this.selected(true).removeResults().value(item);
                        $this.trigger('select:flexdatalist', [item, options]);
                    }
                }).hover(function() {
                    $li.removeClass('active');
                    $(this).addClass('active');
                }, function() {
                    $(this).removeClass('active');
                });

                if (options.focusFirstResult) {
                    $li.filter(':first').addClass('active');
                }

                $this.position();
            }

        /**
         * Get/create list container.
         */
            $this.getContainer = function () {
                var $target = $this;
                if (options.multiple) {
                    $target = $ulMultiple;
                }
                var $container = $('ul.flexdatalist-results');
                if ($container.length === 0) {
                    $container = $('<ul>')
                        .addClass('flexdatalist-results')
                        .appendTo('body')
                        .css({
                            'border-color': $target.css("border-left-color"),
                            'border-width': '1px',
                            'border-bottom-left-radius': $target.css("border-bottom-left-radius"),
                            'border-bottom-right-radius': $target.css("border-bottom-right-radius")
                        });
                }
                return $container;
            }

        /**
         * Remove results.
         */
            $this.removeResults = function () {
                $('ul.flexdatalist-results').remove();
                return $this;
            }

        /**
         * Items iteration.
         */
            $this.items = function (items, $ul) {
                for (var index = 0; index < items.length; index++) {
                    $this.item(items[index]).appendTo($ul);
                }
            }

        /**
         * Result item creation.
         */
            $this.item = function (item) {
                var $li = $('<li>')
                    .data('item', item)
                    .addClass('item');

                for (var index = 0; index < options.visibleProperties.length; index++) {
                    var property = options.visibleProperties[index];
                    if (options.groupBy && options.groupBy === property || typeof item[property] === 'undefined') {
                        continue;
                    }
                    var $item = {};
                    if (property === 'thumb') {
                        // Thumbnail image
                        $item = $('<img>')
                            .addClass('item-' + property)
                            .attr('src', item[property]);
                    } else {
                        var propertyText = $this.getHighlight(item, property);
                        // Other text properties
                        $item = $('<span>')
                            .addClass('item-' + property)
                            .html(propertyText + ' ');
                    }
                    $item.appendTo($li);
                }
                return $li;
            }

        /**
         * Get input that holds data to be sent.
         */
            $this.hiddenInput = function () {
<<<<<<< HEAD
                var $form = $this.parents('form:eq(0)'),
                    $input = $form.find('input[type="hidden"][name="' + _inputName + '"]');
=======
                var $input = $('input[type="hidden"][name="' + _inputName + '"]');
>>>>>>> 0c63a0643a111bfd5285c40f2aef208324cb2215
                if ($input.length > 0) {
                    return $input;
                }
                $this.attr('name', null);
                return $('<input type="hidden">').attr({
                    'name': _inputName
                }).insertAfter($this);
            }

        /**
         * Check if data was selected.
         */
            $this.selected = function (selected) {
                var className = 'flexdatalist-selected';
                if (typeof selected === 'undefined') {
                    return $this.hasClass(className);
                }
                selected ? $this.addClass(className) : $this.removeClass(className);
                return $this;
            }

        /**
         * Set value on item selection.
         */
            $this.value = function (val) {
                if (typeof val === 'undefined') {
                    return $this.data('value');
                }
                var text = $this._text(val);
                var value = $this._value(val);
<<<<<<< HEAD

=======
>>>>>>> 0c63a0643a111bfd5285c40f2aef208324cb2215
                if (options.multiple) {
                    if (val === '') {
                        return $this;
                    }
                    $this.val('');
                    var $li = $('<li>')
                        .addClass('value')
                        .append('<span class="text">' + text + '</span>')
                        .append('<span class="remove">&times;</span>')
<<<<<<< HEAD
                        .insertBefore($ulMultiple.find('li.input-container')),
                        isJSON = typeof options.valueProperty === 'object' || options.valueProperty === '*';

                    if (isJSON) {
                       value = $this._inputValue(value);
                    } else {
                        var $input = $('<input type="hidden">').attr({
                            'name': _inputName + '[]'
                        }).appendTo($li);
                        value = $this._inputValue(value, $input);
                    }

                    $li.find('span.remove').click(function () {
                        var $container = $(this).parent();
                        if (isJSON) {
                            var currentValue = $this._inputValue();
                            currentValue = currentValue.splice($container.index() + 1, 1);
                            currentValue = JSON.stringify(currentValue);
                            $this._inputValue(currentValue);
                        }
                        $container.remove();
=======
                        .insertBefore($ulMultiple.find('li.input-container'))

                    $('<input type="hidden">').attr({
                        'name': _inputName
                    }).appendTo($li).val(value);

                    $li.find('span.remove').click(function () {
                        $(this).parent().remove();
>>>>>>> 0c63a0643a111bfd5285c40f2aef208324cb2215
                    });
                } else {
                    text = text.trim();
                    if (text.length > 0) {
                        $this.val(text);
                    }
<<<<<<< HEAD
                    value = $this._inputValue(value);
                }
                $this.trigger('change:flexdatalist', [value, text, options]);
                return $this;
            }

        /**
         * Set text on item selection.
=======
                    $this.hiddenInput().val(value);
                }
                $this.trigger('change:flexdatalist', [value, text, options]);
                return $this.data('value', value);
            }

        /**
         * Set value on item selection.
>>>>>>> 0c63a0643a111bfd5285c40f2aef208324cb2215
         */
            $this._text = function (item) {
                var text = item;
                if (typeof item === 'object') {
                    text = item[options.searchIn[0]];
                    if (typeof item[options.textProperty] !== 'undefined') {
                        text = item[options.textProperty];
                    } else {
<<<<<<< HEAD
                        text = $this._replacePlaceholders(item, options.textProperty, text);
=======
                        text = $this._placeholders(item, options.textProperty, text);
>>>>>>> 0c63a0643a111bfd5285c40f2aef208324cb2215
                    }
                }
                return text;
            }

        /**
<<<<<<< HEAD
         * Get value to add.
         */
            $this._value = function (item) {
                var value = item;
                if (typeof item === 'object') {
                    value = item[options.searchIn[0]];
                    if (options.valueProperty === '*') {
                        value = item;
                    } else if (typeof item[options.valueProperty] !== 'undefined') {
                        value = item[options.valueProperty];
                    } else if (options.valueProperty && typeof options.valueProperty === 'object') {
                        var value = {},
                            properties = options.valueProperty,
                            textProperties = options.textProperty;

                        // Add placeholder properties to list
                        if (textProperties) {
                            var _properties = textProperties;
                            if (typeof textProperties === 'string') {
                                _properties = $this._parsePlaceholders(textProperties);
                            }
                            if (_properties && typeof _properties === 'object') {
                                $.each(_properties, function (string, property) {
                                    properties.push(property);
                                });
                            }
                        } else if (typeof item[textProperties] !== 'undefined') {
                            properties.push(textProperties);
                        }

                        $.each(properties, function (i, property) {
                            if (typeof item[property] !== 'undefined') {
                                value[property] = item[property];
                            }
                        });
                    } else {
                        value = $this._replacePlaceholders(item, options.valueProperty, value);
                    }
                    if (typeof value === 'object' && options.multiple) {
                        var currentValue = $this._inputValue();
                        currentValue.push(value);
                        value = currentValue;
                    }
                }
                return value;
            }
            
        /**
         * Set value on item selection.
         */
            $this._inputValue = function (value, $input) {
                var isJSON = typeof options.valueProperty === 'object' || options.valueProperty === '*';
                if (typeof value === 'undefined') {
                    value = $this.data('value');
                    if (isJSON) {
                        value ? JSON.parse($this.data('value')) : [];
                    }
                    return $this.data('value') ? JSON.parse($this.data('value')) : [];
                }

                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }
                if (!$input) {
                    $input = $this.hiddenInput();
                }
                $input.val(value);
                $this.data('value', value);
                return value;
            }

        /**
         * Replace placeholders ('{property_name}') in text
         * with respective property value.
         */
            $this._replacePlaceholders = function (item, pattern, value) {
                if (typeof item === 'object' && typeof pattern === 'string') {
                    var properties = $this._parsePlaceholders(pattern);
                    if (properties) {
                        $.each(properties, function (string, property) {
                            if (typeof item[property] !== 'undefined') {
                                pattern = pattern.replace(string, item[property]);
                            }
                        });
                        return pattern;
                    }
                }
                return value;
            }

        /**
         * Extract placeholders property names.
         */
            $this._parsePlaceholders = function (pattern) {
                var matches = pattern.match(/\{.+?\}/g);
                if (matches) {
                    var properties = {};
                    matches.map(function (string) {
                        properties[string] = string.slice(1, -1);
                    });
                    return properties;
                }
                return false;
=======
         * Set value on item selection.
         */
            $this._value = function (item) {
                var text = item;
                if (typeof item === 'object') {
                    text = item[options.searchIn[0]];
                    if (options.valueProperty === '*') {
                        text = JSON.stringify(item);
                    } else if (typeof item[options.valueProperty] !== 'undefined') {
                        text = item[options.valueProperty];
                    } else {
                        text = $this._placeholders(item, options.valueProperty, text);
                    }
                }
                return text;
            }

        /**
         * Set value on item selection.
         */
            $this._placeholders = function (item, pattern, value) {
                if (typeof item === 'object' && typeof pattern === 'string') {
                    var matches = pattern.match(/\{.+?\}/g);
                    if (matches) {
                        matches.map(function(string) {
                            var property = string.slice(1, -1);
                            if (typeof item[property] !== 'undefined') {
                                pattern = pattern.replace(string, item[property]);
                            }
                        });
                        return pattern;
                    }
                }
                return value;
>>>>>>> 0c63a0643a111bfd5285c40f2aef208324cb2215
            }

        /**
         * Normalize string to a consistent one.
         */
            $this.normalizeString = function (string) {
                return string.toUpperCase();
            }

        /**
         * Get keyword with left trim.
<<<<<<< HEAD
         */
            $this.keyword = function () {
                return this.val().replace(/^\s+/,"");
            }

        /**
         * Check if highlighted property value exists,
         * if true, return it, if not, fallback to given string
         */
            $this.getHighlight = function (item, property, fallback) {
                if (typeof item[property + '_highlight'] !== 'undefined') {
                    return item[property + '_highlight'];
                }
                return (item[property] !== 'undefined' ? item[property] : fallback);
            }

        /**
         * Position results below parent element.
         */
=======
         */
            $this.keyword = function () {
                return this.val().replace(/^\s+/,"");
            }

        /**
         * Check if highlighted property value exists,
         * if true, return it, if not, fallback to given string
         */
            $this.getHighlight = function (item, property, fallback) {
                if (typeof item[property + '_highlight'] !== 'undefined') {
                    return item[property + '_highlight'];
                }
                return (item[property] !== 'undefined' ? item[property] : fallback);
            }

        /**
         * Position results below parent element.
         */
>>>>>>> 0c63a0643a111bfd5285c40f2aef208324cb2215
            $this.position = function () {
                var $target = $this;
                if (options.multiple) {
                    $target = $ulMultiple;
                }
                // Set some required CSS propities
                $('ul.flexdatalist-results').css({
                    'width': $target.outerWidth() + 'px',
                    'top': (($target.offset().top + $target.outerHeight())) + 'px',
                    'left': $target.offset().left + 'px',
                    'z-index': ($target.css('z-index') + 1)
                });
            }
            $this.init();
            $this._setValue();
        });
    }
    $('.flexdatalist').flexdatalist();
})(jQuery);