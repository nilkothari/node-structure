-- CreateTable
CREATE TABLE "KeyStore" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "primaryKey" TEXT NOT NULL,
    "secondaryKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KeyStore" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
