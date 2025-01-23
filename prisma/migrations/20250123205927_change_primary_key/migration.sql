

-- Passo 1: Adicione uma nova coluna temporária para armazenar os IDs convertidos
ALTER TABLE "_PostImages" ADD COLUMN "tempImageId" INTEGER;

-- Passo 2: Preencha a nova coluna com valores correspondentes ao "idImage" da tabela "Image"
UPDATE "_PostImages"
SET "tempImageId" = (
  SELECT "idImage"
  FROM "Image"
  WHERE "Image"."id" = "_PostImages"."A"
);

-- Passo 3: Certifique-se de que todos os valores foram preenchidos
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "_PostImages"
    WHERE "tempImageId" IS NULL
  ) THEN
    RAISE EXCEPTION 'Existem valores nulos em tempImageId. Verifique os dados antes de continuar.';
  END IF;
END $$;

-- Passo 4: Remova a chave estrangeira antiga e substitua a coluna "A" por "tempImageId"
ALTER TABLE "_PostImages" DROP CONSTRAINT "_PostImages_A_fkey";
ALTER TABLE "_PostImages" DROP COLUMN "A";
ALTER TABLE "_PostImages" RENAME COLUMN "tempImageId" TO "A";

-- Passo 5: Adicione a restrição única na coluna "idImage"
ALTER TABLE "Image" ADD CONSTRAINT "Image_idImage_unique" UNIQUE ("idImage");

-- Passo 6: Adicione a nova chave estrangeira na coluna "A"
ALTER TABLE "_PostImages"
ADD CONSTRAINT "_PostImages_A_fkey"
FOREIGN KEY ("A") REFERENCES "Image"("idImage") ON DELETE CASCADE ON UPDATE CASCADE;

-- Passo 7: Atualize a tabela "Image" para usar "idImage" como chave primária
ALTER TABLE "Image" DROP CONSTRAINT "Image_pkey",
ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("idImage");
