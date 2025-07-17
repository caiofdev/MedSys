<?php

if (!function_exists('getUniqueModelId')) {
    /**
     * Returns a unique ID from a model, avoiding repetitions
     *
     * @param string $modelClass Name of the Model class (e.g., 'App\Models\Consultation')
     * @param string $cacheKey Unique key used to cache already used IDs (e.g., 'consultation_prescription')
     * @return mixed
     */
    function getUniqueModelId($modelClass, $cacheKey)
    {
        // Global cache to store used IDs by context
        static $usedIds = [];

        // Initialize the cache for this key if it doesn't exist
        if (!isset($usedIds[$cacheKey])) {
            $usedIds[$cacheKey] = [];
        }

        // Search for available (unused) IDs
        $availableIds = $modelClass::pluck('id')
            ->diff($usedIds[$cacheKey])
            ->values()
            ->toArray();

        // If there are no more available IDs, reset the cache
        if (empty($availableIds)) {
            $usedIds[$cacheKey] = [];
            $availableIds = $modelClass::pluck('id')->toArray();
        }

        // Select a random ID
        $selectedId = fake()->randomElement($availableIds);

        // Mark as used
        $usedIds[$cacheKey][] = $selectedId;
        
        return $selectedId;
    }
}
