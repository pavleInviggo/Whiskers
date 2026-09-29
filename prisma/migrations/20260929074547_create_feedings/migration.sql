-- CreateTable
CREATE TABLE "feedings" (
    "id" SERIAL NOT NULL,
    "source" TEXT NOT NULL,
    "instance" TEXT NOT NULL,
    "fed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedings_pkey" PRIMARY KEY ("id")
);
