ALTER TABLE "users" ADD COLUMN "tenant_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_tenant_id_unique" UNIQUE("tenant_id");