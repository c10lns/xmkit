(function(global){
		var TYPE = {
			D:'xm::debug',
			E:'xm::error'
		}

		var XMLog = function() {
			this.init();
			this.log('XMLog init');
		}

		XMLog.prototype = {
			init: function() {
				var cont = document.createElement('div');
				cont.style.position = 'absolute';
				cont.style.zIndex = 999;
				cont.style.width = '100%';
				cont.style.left = 0;
				cont.style.top = 0;
				cont.style.overflowY = 'scroll';
				cont.style.backgroundColor = 'rgba(0,0,0,0.6)';
				cont.style.maxHeight = '200px';

				document.getElementsByTagName('body')[0].appendChild(cont);
				this.container = cont;
			},
			print: function(msg, type) {
	            var logText = document.createElement('p');
				var time = new Date().toLocaleTimeString();
	            logText.innerText = time + ' ' +  msg[0]; // 这里传过来的依然是一个对象，第一个参数是具体数据
				logText.style.fontSize = '14px';

				if (type === TYPE.E) {
					logText.style.color = 'rgb(251, 64, 64)';
				} else if (type === TYPE.D) {
		            logText.style.color = '#fff';
				}
	            this.container.appendChild(logText);
			},
			log: function() {
				for (var i = 0; i < arguments.length; i++) {
					this.print(arguments[i], TYPE.D);
				}
			},
			error: function() {
				for (var i = 0; i < arguments.length; i++) {
					this.print(arguments[i], TYPE.E);
				}
			}
		}

		var xmLog = new XMLog();

		var exchangeLog = function() {
			xmLog.log(arguments);
		}

		var exchangeError = function() {
			xmLog.error(arguments);
		}

        global.console.log = exchangeLog;
		global.console.error = exchangeError;

		// 已经绑定的onerror监听需要在处理完之后调用
		var oldOnError;
		if (window.onerror) {
			oldOnError = window.onerror;
		}
        window.onerror = function(msg, filename, lineno, colno, error) {
            console.log('error:' + lineno + '  ' + msg, TYPE.E);
            console.log(error, TYPE.E);
			if (oldOnError) {
				oldOnError(msg, filename, lineno, colno, error);
			}
        }
    })(window)