<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('keycloak_id')->unique()->nullable()->after('id');
            $table->json('keycloak_groups')->nullable()->after('email');
            $table->json('keycloak_roles')->nullable()->after('keycloak_groups');
            $table->timestamp('last_login_at')->nullable()->after('updated_at');
            $table->string('last_login_ip')->nullable()->after('last_login_at');
            $table->boolean('is_active')->default(true)->after('last_login_ip');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'keycloak_id',
                'keycloak_groups', 
                'keycloak_roles',
                'last_login_at',
                'last_login_ip',
                'is_active'
            ]);
        });
    }
};
