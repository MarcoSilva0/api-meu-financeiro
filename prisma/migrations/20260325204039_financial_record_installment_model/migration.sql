-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_financial_records" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "installmentsTotal" INTEGER NOT NULL DEFAULT 1,
    "installmentNumber" INTEGER NOT NULL DEFAULT 1,
    "installmentGroup" TEXT,
    "installmentsPaid" INTEGER NOT NULL DEFAULT 0,
    "date" DATETIME NOT NULL,
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "expireAt" DATETIME,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "paidAt" DATETIME,
    "categoryId" INTEGER NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "financial_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "financial_records_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "financial_records_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_financial_records" ("amount", "categoryId", "createdAt", "date", "description", "expireAt", "expired", "id", "installmentsPaid", "installmentsTotal", "paid", "paidAt", "paymentMethodId", "title", "type", "updatedAt", "userId") SELECT "amount", "categoryId", "createdAt", "date", "description", "expireAt", "expired", "id", "installmentsPaid", "installmentsTotal", "paid", "paidAt", "paymentMethodId", "title", "type", "updatedAt", "userId" FROM "financial_records";
DROP TABLE "financial_records";
ALTER TABLE "new_financial_records" RENAME TO "financial_records";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
