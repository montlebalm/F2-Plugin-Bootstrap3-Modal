function _modalHeaderHtml(title) {
	var html = [
		'<div class="modal-header">',
			'<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
			'<h4 class="modal-title">', title, '</h4>',
		'</div>'
	];

	return html.join('');
}

function _modalBodyHtml(message) {
	var html = [
		'<div class="modal-body">',
			'<p>' + message + '</p>',
		'</div>'
	];

	return html.join('');
}

function _modalFooterHtml(showCancel) {
	var html = ['<div class="modal-footer">'];

	if (showCancel) {
		html.push('<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>');
	}

	html.push('<button type="button" class="btn btn-primary btn-ok">OK</button>');
	html.push('</div>');

	return html.join('');
}

function _modalHtml(title, message, showCancel) {
	return [
		'<div class="modal">',
			'<div class="modal-dialog">',
				'<div class="modal-content">',
					_modalHeaderHtml(title),
					_modalBodyHtml(message),
					_modalFooterHtml(showCancel),
				'</div>',
			'</div>',
		'</div>'
	].join('');
};

module.exports = function(F2) {

	function alert(message, callback) {
		callback = callback || function() {};

		var alertHtml = _modalHtml('Alert', message);
		var $alert = $(alertHtml).on('show.bs.modal', function() {
			$alert.on('click', '.btn-primary', function() {
				$alert.modal('hide').remove();
				callback();
			});
		});

		$alert.modal({ backdrop:true });
	}

	function confirm(message, okCallback, cancelCallback) {
		okCallback = okCallback || function() {};
		cancelCallback = cancelCallback || function() {};

		var confirmHtml = _modalHtml('Confirm', message, true);
		var $confirm = $(confirmHtml).on('show.bs.modal', function() {
			$confirm.on('click', '.btn-ok', function() {
				$confirm.modal('hide').remove();
				okCallback();
			});

			$confirm.on('click', '.btn-cancel', function() {
				$confirm.modal('hide').remove();
				cancelCallback();
			});
		})

		$confirm.modal({ backdrop:true });
	}

	F2.extend('UI', {
		alert: alert,
		confirm: confirm
	});

};
