<?php

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Ajouter des UUID publics aux tables principales
        $this->addPublicUuid('users');
        $this->addPublicUuid('jobs');
        $this->addPublicUuid('failed_jobs');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Supprimer les colonnes UUID publiques
        $this->removePublicUuid('users');
        $this->removePublicUuid('jobs');
        $this->removePublicUuid('failed_jobs');
    }

    /**
     * Ajouter une colonne UUID publique à une table
     */
    private function addPublicUuid(string $tableName): void
    {
        if (!Schema::hasTable($tableName)) {
            return;
        }

        Schema::table($tableName, function (Blueprint $table) {
            $table->uuid('_id')->unique()->after('id');
        });

        // Générer des UUID pour les enregistrements existants
        DB::table($tableName)->get()->each(function ($record) use ($tableName) {
            DB::table($tableName)
                ->where('id', $record->id)
                ->update(['_id' => (string) Str::uuid()]);
        });
    }

    /**
     * Supprimer la colonne UUID publique d'une table
     */
    private function removePublicUuid(string $tableName): void
    {
        if (!Schema::hasTable($tableName)) {
            return;
        }

        Schema::table($tableName, function (Blueprint $table) {
            $table->dropColumn('_id');
        });
    }
};