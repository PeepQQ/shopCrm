-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('PARENT', 'FOLDER');

-- AddColumn
ALTER TABLE "Group"
ADD COLUMN "type" "GroupType";

UPDATE "Group"
SET "type" = 'PARENT'
WHERE "type" IS NULL;

ALTER TABLE "Group"
ALTER COLUMN "type" SET NOT NULL;