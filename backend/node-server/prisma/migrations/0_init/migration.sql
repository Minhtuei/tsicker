-- CreateTable
CREATE TABLE "collection" (
    "id" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
    "title" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "user_id" UUID NOT NULL,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id","user_id")
);

-- CreateTable
CREATE TABLE "contain_post" (
    "user_id" UUID NOT NULL,
    "collection_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,

    CONSTRAINT "contain_post_pkey" PRIMARY KEY ("user_id","collection_id","post_id")
);

-- CreateTable
CREATE TABLE "download" (
    "user_id" UUID NOT NULL,
    "image_id" UUID NOT NULL,

    CONSTRAINT "download_pkey" PRIMARY KEY ("user_id","image_id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
    "style" VARCHAR(255),
    "price" DOUBLE PRECISION,
    "post_id" UUID,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interact" (
    "user_id" UUID NOT NULL,
    "post_id" UUID NOT NULL,
    "comment" TEXT,
    "note" TEXT,
    "favorite" BOOLEAN NOT NULL,
    "save" BOOLEAN NOT NULL,
    "react_id" UUID,

    CONSTRAINT "interact_pkey" PRIMARY KEY ("user_id","post_id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
    "title" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "date_created" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reaction" (
    "id" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
    "name" VARCHAR(255),
    "url" TEXT,

    CONSTRAINT "reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscribe" (
    "subscriber_id" UUID NOT NULL,
    "subscribed_id" UUID NOT NULL,

    CONSTRAINT "subscribe_pkey" PRIMARY KEY ("subscriber_id","subscribed_id")
);

-- CreateTable
CREATE TABLE "tag" (
    "post_id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("post_id","name")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT public.uuid_generate_v4(),
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "date_created" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "total_sub" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contain_post" ADD CONSTRAINT "contain_post_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contain_post" ADD CONSTRAINT "contain_post_user_id_collection_id_fkey" FOREIGN KEY ("user_id", "collection_id") REFERENCES "collection"("user_id", "id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "download" ADD CONSTRAINT "download_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "download" ADD CONSTRAINT "download_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interact" ADD CONSTRAINT "interact_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interact" ADD CONSTRAINT "interact_react_id_fkey" FOREIGN KEY ("react_id") REFERENCES "reaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interact" ADD CONSTRAINT "interact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscribe" ADD CONSTRAINT "subscribe_subscribed_id_fkey" FOREIGN KEY ("subscribed_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscribe" ADD CONSTRAINT "subscribe_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

