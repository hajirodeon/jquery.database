// todo: data-attr connection
+function($) {
    'use strict';

    $.extend({
        database: {
            settings: {
                database: null,
                scope: 'local', // session or local
                prefix: 'db_',
                logging: true,
                verbose: true, // logs to console
                auto_create: true, // auto create database if no exists
                cache: true,
                parse_content: null // custom parser
            },

            connect: function(database, callback) {
                this.settings.database = database;
                this.connect.scope = this.settings.scope === 'session' ? sessionStorage : localStorage;

                var _storage = this.connect.scope;
                var _database = _storage.getItem(this.settings.database);

                if(!_database && this.settings.auto_create) {
                    _storage.setItem(this.settings.database, JSON.stringify({
                        [this.settings.database]: []
                    }));
                }

                if(callback) {
                    callback(database);
                }

                return this;
            },

            disconnect: function() {
                this.settings.database = null;
                return this;
            },

            config: function(_custom) {
                $.extend(this.settings, _custom);
                return this;
            },

            dbprefix: function(prefix) {
                return prefix ? this.settings.prefix = prefix : this.settings.prefix;
            },

            select: function(_item) {
                if(!this.settings.database) {
                    throw new this.DependencyException('No database selected.');
                }

                var _table;
                var _results = [];

                var _from = function(table) {
                    _table = table;
                    return this;
                };

                var _where = function(_item, _value) {
                    if(!_table) {
                        throw new this.DependencyException('No table selected.');
                    }

                    _results.push('testing');

                    return this;
                };

                var _result = function() {
                    return this;
                };

                var _limit = function() {
                    return this;
                };

                console.info(_results)

                return {
                    from: _from,
                    where: _where,
                    result: _results,
                    limit: _limit
                };
            },

            insert: function(_table, _content) {
                var _data = JSON.parse(this._scope().getItem(this.settings.database));

                _data[this.settings.database][_table] = _content
                // console.info(_table, _content);
                console.info(_data)
            },

            update: function(_item, _content) {},
            delete: function(_item) {},
            execute: function() {},
            affected_rows: function() {},
            result: function() {},
            order_by: function() {},
            flush_cache: function() {},

            get: function(table, limits) {
                // return all data in a table  
            },

            empty_table: function() {
                // empty table content
            },

            // return number of rows in a tables
            count: function() {},

            _scope: function() {
                return this.connect.scope;
            },

            _close: function() {
                // close connection, reset global vars, custom methods
            },

            log: function(message, method) {
                // do not log if verbose is false
                if(!this.settings.verbose) return;

                console[method](message);
            },

            DependencyException: function(message) {
                this.message = message;
                this.name = 'DependencyException';

                $.database.log(message, 'warn');
            }
        }
    });

    $.fn.database = function() {
        // console.info(this);
    }

}(jQuery);