(function() {
    'use strict';
    angular
        .module('app')
        .filter("timeago", timeago);

    function timeago () {
        return function (time, local, raw) {
            if (!time) return "никогда";

            if (!local) {
                (local = Date.now())
            }

            if (angular.isDate(time)) {
                time = time.getTime();
            } else if (typeof time === "string") {
                time = new Date(time).getTime();
            }

            if (angular.isDate(local)) {
                local = local.getTime();
            }else if (typeof local === "string") {
                local = new Date(local).getTime();
            }

            if (typeof time !== 'number' || typeof local !== 'number') {
                return;
            }

            var
                offset = Math.abs((local - time) / 1000),
                span = [],
                MINUTE = 60,
                HOUR = 3600,
                DAY = 86400,
                WEEK = 604800,
                MONTH = 2629744,
                YEAR = 31556926,
                DECADE = 315569260;

            if (offset <= MINUTE)              span = [ '', raw ? 'только что' : 'несколько минут назад' ];
            else if (offset < (MINUTE * 60))   span = [ Math.round(Math.abs(offset / MINUTE)), plural_str(Math.round(Math.abs(offset / MINUTE)), 'минута', 'минуты', 'минут') ];
            else if (offset < (HOUR * 24))     span = [ Math.round(Math.abs(offset / HOUR)), plural_str(Math.round(Math.abs(offset / HOUR)), 'час', 'часа', 'часов') ];
            else if (offset < (DAY * 7))       span = [ Math.round(Math.abs(offset / DAY)), plural_str(Math.round(Math.abs(offset / DAY)), 'день', 'дня', 'дней') ];
            else if (offset < (WEEK * 52))     span = [ Math.round(Math.abs(offset / WEEK)), plural_str(Math.round(Math.abs(offset / WEEK)), 'неделя', 'недели', 'недель') ];
            else if (offset < (YEAR * 10))     span = [ Math.round(Math.abs(offset / YEAR)), plural_str(Math.round(Math.abs(offset / YEAR)), 'год', 'года', 'лет') ];
            else                               span = [ '', 'давным давно в далекой далекой галактике' ];

            span = span.join(' ');

            if (raw === true) {
                return span;
            }
            return (time <= local) ? span + ' назад' : 'через ' + span;
        }
    }

})();
