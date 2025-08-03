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
        static $usedIds = [];

        if (!isset($usedIds[$cacheKey])) {
            $usedIds[$cacheKey] = [];
        }

        $availableIds = $modelClass::pluck('id')
            ->diff($usedIds[$cacheKey])
            ->values()
            ->toArray();

        if (empty($availableIds)) {
            $usedIds[$cacheKey] = [];
            $availableIds = $modelClass::pluck('id')->toArray();
        }

        $selectedId = fake()->randomElement($availableIds);

        $usedIds[$cacheKey][] = $selectedId;
        
        return $selectedId;
    }
}
