import { Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';

type AlertType = 'none' | 'success' | 'warning' | 'error' | 'info';

@Injectable()
export class NotifyService {

	constructor(private notificationService: NotificationService) {
	}

	public showSuccess(message: string): void {
		this.showAlert(message, 'success');
	}

	public showWarning(message: string): void {
		this.showAlert(message, 'warning');
	}

	public showInfo(message: string): void {
		this.showAlert(message, 'info');
	}

	public showError(message: string): void {
		this.showAlert(message, 'error');
	}

	public showErrors(messages: Array<string>): void {
		messages.forEach(x => this.showError(x));
	}

	private showAlert(message: string, type: AlertType, hideAfter: number = 5000): void {
		this.notificationService.show({
			content: `\n${message}\n`,
			hideAfter: hideAfter,
			position: { horizontal: 'center', vertical: 'bottom' },
			animation: { type: 'slide', duration: 400 },
			type: { style: type, icon: true }
		});
	}
}