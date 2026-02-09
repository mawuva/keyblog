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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->uuid('_id')->unique()->nullable();
            $table->text('name');
            $table->text('slug')->unique()->nullable()->index();
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->string('icon_type', 20)->nullable();
            $table->string('icon_value', 255)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
