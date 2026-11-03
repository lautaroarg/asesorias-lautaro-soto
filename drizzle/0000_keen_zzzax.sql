CREATE TABLE `consultation_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`business` text NOT NULL,
	`answers` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL
);
