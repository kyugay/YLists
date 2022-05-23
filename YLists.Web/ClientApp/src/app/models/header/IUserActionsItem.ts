export interface IUserActionsItem {
	text: string;
	isDisabled(): boolean;
	isVisible(): boolean;
	onClick(): void;
}